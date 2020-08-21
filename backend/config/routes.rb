Rails.application.routes.draw do
  resources :votes
  namespace :api do
    namespace :v1 do
      post '/auth/login', to: 'authentication#login'
      resources :users, param: :_username
      resources :posts, param: :_username
      resources :followings
      resources :votes
      get '/UserPosts/:username', to: 'posts#get_user_posts'
      get '/FollowList/:username', to: 'followings#follow_list'
      post '/feed', to: 'posts#get_feed'
      post '/checkfollowings', to: 'followings#check_following'
      post '/unfollow', to: 'followings#unfollow'
      get '/*a', to: 'application#not_found'
    end
  end
 # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 end