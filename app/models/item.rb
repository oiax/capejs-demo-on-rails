class Item < ActiveRecord::Base
  include Sortable

  def siblings
    Item.all
  end
end
