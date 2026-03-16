class CreateVaultPages < ActiveRecord::Migration[7.1]
  def change
    create_table :vault_pages, id: :uuid do |t|
      t.references :vault_business, null: false, foreign_key: true, type: :uuid
      t.string :name, null: false
      t.string :url, null: false
      t.string :icon
      t.string :category, default: "other"
      t.integer :position, default: 0
      t.boolean :pinned, default: false
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :vault_pages, [:vault_business_id, :position]
  end
end
