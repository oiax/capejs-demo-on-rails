class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.boolean :done, null: false, default: false
      t.integer :sort_order, null: false

      t.timestamps null: false
    end
  end
end
