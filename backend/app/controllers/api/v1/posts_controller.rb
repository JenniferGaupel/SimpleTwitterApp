class Api::V1::PostsController < ApplicationController
  before_action :authorize_request 
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :find_user, except: %i[ index]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts, status: :ok
  end

  # GET /posts/1
  def show
    render json: @posts
  end

  # POST /posts
  def create
    if @user == nil
      render json: { errors: "Error finding user" },
        status: :unprocessable_entity
    else
      @post = Post.new(post_params)
      @post.user = @user
      if @post.save
        render json: @post, status: :created, location: api_v1_post_url(@post)
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy

    render json: { msg: "Post deleted" },
    status: :ok
  end

  # POST /feed/
  def get_feed
    # Get all posts from the user's that I follow 
    followed_posts = Array.new
    user_id = @user.id
    @followings = Following.where(follower_id: user_id)
    @followings.each do |following|
      @posts = Post.where(user_id: following.followed_id)
       @posts.each do |post|
         followed_posts.push(post)
      end
    end 
    
    render json: followed_posts, status: :ok 
  end

  # GET /UserPosts
  def get_user_posts
    # get all of a single user's posts
    user_posts = Array.new
    user_name = params[:username]
    @posts = Post.where(username: user_name)
    @posts.each do |post|
      user_posts.push(post)
    end 
    render json: user_posts,
    status: :ok 
  end

  private

    def find_user
      @user = User.find_by_username!(params[:username])
      rescue ActiveRecord::RecordNotFound
        render json: { errors: 'User not found' }, status: :not_found
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.permit(:post, :created_at, :user_id, :username)
    end
end
