module Sortable
  extend ActiveSupport::Concern

  def first?
    sort_order == 1
  end

  def last?
    siblings.maximum(:sort_order) == sort_order
  end

  def move_up
    unless first?
      ActiveRecord::Base.transaction do
        if previous_item
          previous_item.update_column(:sort_order, previous_item.sort_order + 1)
          update_column(:sort_order, sort_order - 1)
        end
      end
    end
  end

  def move_down
    unless last?
      ActiveRecord::Base.transaction do
        if next_item
          next_item.update_column(:sort_order, next_item.sort_order - 1)
          update_column(:sort_order, sort_order + 1)
        end
      end
    end
  end

  def siblings
    raise 'The "siblings" method must be overriden.'
  end

  def previous_item
    @previous_item ||= siblings
      .where("#{self.class.table_name}.sort_order < ?", self.sort_order)
      .order("#{self.class.table_name}.sort_order").last
  end

  def next_item
    @next_item ||= siblings
      .where("#{self.class.table_name}.sort_order > ?", self.sort_order)
      .order("#{self.class.table_name}.sort_order").first
  end

  included do
    before_create do
      self.sort_order = (siblings.maximum(:sort_order) || 0) + 1
    end

    before_destroy do
      siblings.where('sort_order > ?', sort_order).
        update_all("sort_order = sort_order - 1")
    end
  end
end
