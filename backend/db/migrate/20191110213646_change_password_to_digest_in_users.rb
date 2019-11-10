class ChangePasswordToDigestInUsers < ActiveRecord::Migration[6.0]
  def up
    change_column :users, :password, :digest
  end

  def down
    change_column :users, :password, :string
  end

end
