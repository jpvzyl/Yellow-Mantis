class CreateWorkspaceMemberships < ActiveRecord::Migration[7.1]
  def change
    create_table :workspace_memberships, id: :uuid do |t|
      t.references :workspace, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.integer :role, null: false, default: 1
      t.datetime :joined_at, default: -> { "CURRENT_TIMESTAMP" }
      t.timestamps
    end

    add_index :workspace_memberships, [:workspace_id, :user_id], unique: true
  end
end
