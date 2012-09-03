class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.string :name
      t.string :description
      t.decimal :cost

      t.timestamps
    end
  end
end
