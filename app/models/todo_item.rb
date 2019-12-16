class TodoItem < ApplicationRecord
  include AASM
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :todo_list

  field :description, type: String
  field :important, type: Boolean
  field :order, type: Integer
  field :urgent, type: Boolean

  validates :description, presence: true

  aasm do
    state :incomplete, initial: true
    state :completed

    event :complete do
      transitions from: :incomplete, to: :completed
    end
    event :reopen do
      transitions from: :completed, to: :incomplete
    end
  end

  def state
    aasm.current_state
  end
end
