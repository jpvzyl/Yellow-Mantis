class CreateTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :teams, id: :uuid do |t|
      t.references :workspace, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :identifier, null: false
      t.text :description
      t.string :icon
      t.string :color, default: "#6366f1"
      t.timestamps
    end

    add_index :teams, [:workspace_id, :identifier], unique: true
  end
end
