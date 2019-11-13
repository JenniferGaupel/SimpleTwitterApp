Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, param: :_usernames
      post '/auth/login', to: 'authentication#login'
      get '/*a', to: 'application#not_found'
      resources :followings
      resources :posts
    end
  end
 # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 end