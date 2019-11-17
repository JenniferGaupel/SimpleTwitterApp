class AddUserToFollowingsForeignKey < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :followings, :users, column: :follower_id
    add_foreign_key :followings, :users, column: :followed_id
  end
end
