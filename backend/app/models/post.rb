class Post < ApplicationRecord
    validates :post, presence: true
    belongs_to :user
end