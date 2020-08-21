class Api::V1::VotesController < ApplicationController
  before_action :authorize_request
  before_action :set_vote, only: [:show, :update, :destroy]

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
    @vote = Vote.new(vote_params)

    if @vote.save
      render json: @vote, status: :created, location: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
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
