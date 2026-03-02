class CreateWorkspaces < ActiveRecord::Migration[7.1]
  def change
    create_table :workspaces, id: :uuid do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :logo
      t.string :invite_code
      t.timestamps
    end

    add_index :workspaces, :slug, unique: true
    add_index :workspaces, :invite_code, unique: true
  end
end
