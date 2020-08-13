class AddPostRefToVotes < ActiveRecord::Migration[6.0]
  def change
    add_reference :votes, :post, null: false, foreign_key: true
  end
end
