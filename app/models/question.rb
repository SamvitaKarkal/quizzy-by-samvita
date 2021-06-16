class Question < ApplicationRecord
    belongs_to :quiz
    validates :title, presence: true, length: {maximum: 50}
  end
  