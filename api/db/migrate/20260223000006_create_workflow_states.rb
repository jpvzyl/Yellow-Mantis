class CreateWorkflowStates < ActiveRecord::Migration[7.1]
  def change
    create_table :workflow_states, id: :uuid do |t|
      t.references :team, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :color, null: false, default: "#bec2c8"
      t.integer :position, null: false, default: 0
      t.integer :state_type, null: false, default: 0
      t.timestamps
    end

    add_index :workflow_states, [:team_id, :position]
  end
end
