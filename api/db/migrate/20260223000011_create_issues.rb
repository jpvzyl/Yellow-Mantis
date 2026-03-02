class CreateIssues < ActiveRecord::Migration[7.1]
  def change
    create_table :issues, id: :uuid do |t|
      t.references :team, null: false, foreign_key: true, type: :uuid
      t.integer :number, null: false
      t.string :identifier, null: false
      t.string :title, null: false
      t.text :description
      t.references :state, null: false, foreign_key: { to_table: :workflow_states }, type: :uuid
      t.integer :priority, null: false, default: 0
      t.references :assignee, foreign_key: { to_table: :users }, type: :uuid
      t.references :creator, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.references :project, foreign_key: true, type: :uuid
      t.references :cycle, foreign_key: true, type: :uuid
      t.references :parent, foreign_key: { to_table: :issues }, type: :uuid
      t.integer :estimate
      t.date :due_date
      t.datetime :started_at
      t.datetime :completed_at
      t.datetime :cancelled_at
      t.float :sort_order, default: 0
      t.timestamps
    end

    add_index :issues, [:team_id, :number], unique: true
    add_index :issues, :identifier, unique: true
    add_index :issues, :priority
    add_index :issues, :sort_order
  end
end
