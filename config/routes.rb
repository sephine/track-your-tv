Rails.application.routes.draw do
  root 'programmes#index'
  match "/welcome", to: "welcome#index", :via => 'get'

  devise_for :users, controllers: { sessions: 'users/sessions', passwords: 'users/passwords', registrations: 'users/registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
