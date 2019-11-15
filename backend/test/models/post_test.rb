require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test "should not save post without text" do
    post = Post.new
    assert_not post.save, "Post was saved without text"
  end
end
