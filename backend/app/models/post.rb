class Post < ApplicationRecord
    validates :post, presence: true
end