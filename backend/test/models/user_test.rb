require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should not save user without username or password" do
    user = User.new
    assert_not user.save, "User was saved without username or password"
  end
end
