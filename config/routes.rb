Rails.application.routes.draw do
  authenticated :user do
    root to: 'programmes#index', as: :authenticated_root
  end
  root to: redirect('/welcome')

  get '/welcome', to: 'welcome#index'
  get '/tvdb/search', to: 'tvdb#search'
  get '/tvdb/series', to: 'tvdb#series'
  get '/search', to: 'programmes#search'

  as :user do
    get 'login' => 'users/sessions#new', :as => :new_user_session
    post 'login' => 'users/sessions#create', :as => :user_session
    delete 'logout' => 'users/sessions#destroy', :as => :destroy_user_session

    get 'users/cancel' => 'users/registrations#cancel', :as => :cancel_user_registration
    post 'sign_up' => 'users/registrations#create', :as => :user_registration
    get 'sign_up' => 'users/registrations#new', :as => :new_user_registration
    get 'users/edit' => 'users/registrations#edit', :as => :edit_user_registration
    patch 'sign_up' => 'users/registrations#update'
    put 'sign_up' => 'users/registrations#update'
    delete 'sign_up' => 'users/registrations#destroy'
  end

  devise_for :users, {controllers: { sessions: 'users/sessions', passwords: 'users/passwords', registrations: 'users/registrations' }, skip: [:sessions, :registrations]}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
