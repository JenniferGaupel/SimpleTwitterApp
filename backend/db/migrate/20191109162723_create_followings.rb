class CreateFollowings < ActiveRecord::Migration[6.0]
  def change
    create_table :followings do |t|
      t.datetime :created_at
      t.int :follower_id
      t.int :followed_id

      t.timestamps
    end
  end
end
