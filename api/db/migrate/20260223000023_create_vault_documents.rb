class CreateVaultDocuments < ActiveRecord::Migration[7.1]
  def change
    create_table :vault_documents, id: :uuid do |t|
      t.references :vault_business, null: false, foreign_key: true, type: :uuid
      t.references :uploaded_by, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.string :name, null: false
      t.text :description
      t.string :category, default: "general"
      t.bigint :file_size
      t.string :content_type
      t.string :file_fingerprint
      t.boolean :sensitive, default: false
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :vault_documents, [:vault_business_id, :category]
  end
end
