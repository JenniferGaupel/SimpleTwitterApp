class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: {case_sensitive: false}
    has_many :follows, :class_name => 'Following', :foreign_key => 'follower_id'
    has_many :followers, :class_name => 'Following', :foreign_key => 'followed_id'
    has_many :posts
end
