class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects, id: :uuid do |t|
      t.references :workspace, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.text :description
      t.string :icon
      t.string :color, default: "#6366f1"
      t.integer :status, null: false, default: 0
      t.references :lead, foreign_key: { to_table: :users }, type: :uuid
      t.date :start_date
      t.date :target_date
      t.float :sort_order, default: 0
      t.timestamps
    end
  end
end
