class Task < ActiveRecord::Base
  include Sortable

  def siblings
    self.class.all
  end
end
