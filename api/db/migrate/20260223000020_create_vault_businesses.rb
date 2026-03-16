class CreateVaultBusinesses < ActiveRecord::Migration[7.1]
  def change
    create_table :vault_businesses, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.string :color, default: "#6366f1"
      t.string :icon
      t.string :website_url
      t.integer :position, default: 0
      t.boolean :archived, default: false

      t.timestamps
    end

    add_index :vault_businesses, [:user_id, :slug], unique: true
    add_index :vault_businesses, [:user_id, :position]
  end
end
