class Api::V1::FollowingsController < ApplicationController
  before_action :authorize_request
 # before_action :set_following, only: [:show, :update, :destroy]
  before_action :find_user, except: %i[index]

  # GET /followings
  def index
    @followings = Following.all

    render json: @followings
  end

  # GET /followings/1
  def show
    render json: @following
  end

  # POST /followings
  def create
    if @follower == nil and @followed == nil
      render json: { errors: "Error finding follower user or followed user" },
        status: :unprocessable_entity
    else
      @following = Following.new()
      @following.follower_user = @follower
      @following.followed_user = @followed
      if @following.save
        render json: @following, status: :created, location: api_v1_following_url(@following)
      else
        render json: @following.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /followings/1
  def update
    if @following.update(following_params)
      render json: @following
    else
      render json: @following.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followings/1
  def destroy
    @following.destroy
    render json: { msg: "Following deleted" },
        status: :ok
  end

  # DELETE /unfollow/
  def unfollow
    # Delete a following record to unfollow. 
    # Using instead of built-in destroy method as it uses the id and this needs to search on follower/followed ids
    follower = @follower.id
    followed = @followed.id
    @following = Following.find_by(follower_id: follower, followed_id: followed)
    @following.destroy
    render json: { msg: "User unfollowed" },
        status: :ok
  end

  # POST /checkfollowings/
  def check_following
    # Check to see if the user is already following another user
    follower = @follower.id
    followed = @followed.id
    @following = Following.find_by(follower_id: follower, followed_id: followed)
    p @following
    if @following == nil
      render json: { result: false },
      status: :ok 
    else
      render json: { result: true },
      status: :ok
    end    
  end

  private

    def find_user
      @follower = User.find_by_username!(params[:follower])
      @followed = User.find_by_username(params[:followed])
      rescue ActiveRecord::RecordNotFound
        render json: { errors: 'User not found' }, status: :not_found
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_following
      @following = Following.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def following_params
      params.permit(:created_at, :follower_id, :followed_id, :following)
    end
end
