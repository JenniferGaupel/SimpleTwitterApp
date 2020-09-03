class Api::V1::VotesController < ApplicationController
  before_action :authorize_request
  before_action :find_user
  before_action :find_post
  # before_action :set_vote, only: [:show, :update, :destroy]
  

  # GET /votes
  def index
    @votes = Vote.all

    render json: @votes
  end

  # GET /votes/1
  def show
    render json: @vote
  end

  # POST /votes
  def create
    if @user == nil or @post == nil or params[:vote_type] == nil
      render json: { errors: "Error voting on the post" },
        status: :unprocessable_entity
    else
      @vote = Vote.new()
      @vote.user_id = @user.id
      @vote.post_id = @post.id
      @vote.vote_type = params[:vote_type]
      if @vote.save
        render json: @vote, status: :created
      else
        render json: @vote.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /votes/1
  def update
    if @vote.update(vote_params)
      render json: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  # DELETE /votes/1
  def destroy
    @vote.destroy
  end

  # POST /checkvotes/
  def check_votes
    user = @user.id
    post = @post.id
    vote = Vote.find_by(post_id: post, user_id: user)
    if vote != nil
      render json: vote
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vote
      @vote = Vote.find(params[:id])
    end

    def find_post
      @post = Post.find(params[:post_id])
    end

    def find_user
      @user = User.find(params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def following_params
      params.permit(:created_at, :user_id, :post_id, :vote, :vote_type)
    end
end
