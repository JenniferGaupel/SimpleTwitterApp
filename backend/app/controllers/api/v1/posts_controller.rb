class Api::V1::PostsController < ApplicationController
  before_action :authorize_request 
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    p "Testing"
    @posts = Post.all

    render json: @posts, status: :ok
  end

  # GET /posts/1
  def show
    render json: @posts
  end

  # POST /posts
  def create
    user_id = params.delete(:user_id)

    @user = User.find_by_id(user_id)
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
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.permit(:post, :created_at, :user_id)
    end
end
