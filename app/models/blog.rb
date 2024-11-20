class Blog < ApplicationRecord
  validates :title, presence: true, length: { minimum: 10, maximum: 100 }

  validates :body, presence: true, length: { minimum: 100, maximum: 4000 }
end
