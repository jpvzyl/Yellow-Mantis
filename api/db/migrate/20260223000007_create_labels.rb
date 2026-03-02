class CreateLabels < ActiveRecord::Migration[7.1]
  def change
    create_table :labels, id: :uuid do |t|
      t.references :workspace, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :color, null: false, default: "#6366f1"
      t.references :parent_label, foreign_key: { to_table: :labels }, type: :uuid
      t.timestamps
    end
  end
end
