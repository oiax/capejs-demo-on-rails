class User < ActiveRecord::Base
  include MiniAuth

  has_many :tasks

  validates :name, presence: true
end
