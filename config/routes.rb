Rails.application.routes.draw do
  authenticated :user do
    root to: 'programmes#index', as: :authenticated_root
  end
  root to: redirect('/welcome')

  #HTML
  get '/:id', to: 'programmes#show', constraints: {id: /\d+/}
  get '/:id/:name', to: 'programmes#show', constraints: {id: /\d+/}
  get '/search', to: 'programmes#search'
  get '/programmes/index', to: 'programmes#index'
  get '/welcome', to: 'welcome#index'

  #JSON
  get '/programme_infos/search', to: 'programme_infos#search'
  get '/programme_infos/full_search', to: 'programme_infos#full_search'
  get '/tracked_programmes/show', to: 'tracked_programmes#show'
  get '/tracked_programmes/index', to: 'tracked_programmes#index'
  post 'tracked_programmes/create', to: 'tracked_programmes#create'
  post 'watched_episodes/update', to: 'watched_episodes#update'

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
