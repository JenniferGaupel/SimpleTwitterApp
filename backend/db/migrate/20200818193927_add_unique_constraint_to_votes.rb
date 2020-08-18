class AddUniqueConstraintToVotes < ActiveRecord::Migration[6.0]
  def change
    add_column :votes, :add_index, :string
    add_column :votes, :, :votes,
    add_column :votes, :[, :post_id,
    add_column :votes, :, :user_id],
    add_column :votes, :, :unique
    add_column :votes, :=, :string
  end
end
