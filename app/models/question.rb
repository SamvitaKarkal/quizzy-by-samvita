class Question < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :option
  accepts_nested_attributes_for :option
  validates :title, presence: true, length: {maximum: 50}
end
