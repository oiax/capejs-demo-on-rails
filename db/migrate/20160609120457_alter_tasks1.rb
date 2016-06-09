class AlterTasks1 < ActiveRecord::Migration
  def change
    add_column :tasks, :user_id, :integer
    add_index :tasks, :user_id
  end
end
