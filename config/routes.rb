Rails.application.routes.draw do
  root 'programmes#index'
  match "/welcome", to: "welcome#index", :via => 'get'

  devise_for :users, :path => '', :path_names => {:sign_in => 'login', :sign_out => 'logout'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
