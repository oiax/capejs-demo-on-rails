class Task < ActiveRecord::Base
  include Sortable

  belongs_to :user

  def siblings
    self.class.all
  end
end
