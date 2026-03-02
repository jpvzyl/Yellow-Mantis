class CreateViews < ActiveRecord::Migration[7.1]
  def change
    create_table :views, id: :uuid do |t|
      t.references :workspace, null: false, foreign_key: true, type: :uuid
      t.references :team, foreign_key: true, type: :uuid
      t.references :created_by, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.string :name, null: false
      t.text :description
      t.string :icon
      t.string :color
      t.jsonb :filters, default: {}
      t.string :grouping
      t.jsonb :sorting, default: {}
      t.integer :layout, null: false, default: 0
      t.boolean :shared, default: false
      t.timestamps
    end
  end
end
