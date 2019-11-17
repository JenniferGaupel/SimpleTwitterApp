class Following < ApplicationRecord
    validates :follower_id, uniqueness: { scope: :followed_id}
    belongs_to :follower_user, :class_name => 'User', :foreign_key => 'follower_id'
    belongs_to :followed_user, :class_name => 'User', :foreign_key => 'followed_id'
end
