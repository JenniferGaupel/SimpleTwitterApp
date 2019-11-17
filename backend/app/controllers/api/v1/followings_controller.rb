class Api::V1::FollowingsController < ApplicationController
  before_action :set_following, only: [:show, :update, :destroy]
  before_action :authorize_request, except: :create

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
    follower_id = params.delete(:follower_id)
    followed_id = params.delete(:followed_id)

    @follower = User.find_by_id(follower_id)
    @followed = User.find_by_id(followed_id)
    if @follower == nil and @followed == nil
      render json: { errors: "Error finding follower user or followed user" },
        status: :unprocessable_entity
    else
      @following = Following.new(following_params)
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_following
      @following = Following.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def following_params
      params.permit(:created_at, :follower_id, :followed_id)
    end
end
