class Widget < ActiveRecord::Base
  attr_accessible :cost, :description, :name

  validates :cost, numericality: { greater_then: 0 }, presence: true

  validates :name, uniqueness: true, presence: true
end
