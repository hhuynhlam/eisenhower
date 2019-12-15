class TodoList < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :todo_items

  field :name, type: String
  field :user_id, type: String

  validates :name, presence: true
  validates :user_id, presence: true

  index(user_id: 1)
end
