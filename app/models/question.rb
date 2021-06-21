class Question < ApplicationRecord
  belongs_to :quiz
  has_many :option, dependent: :destroy
  accepts_nested_attributes_for :option
  validates :title, presence: true, length: {maximum: 50}
  validates :answer, presence: true
  validates :quiz_id, presence: true
end
