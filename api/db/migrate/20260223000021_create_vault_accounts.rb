class CreateVaultAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :vault_accounts, id: :uuid do |t|
      t.references :vault_business, null: false, foreign_key: true, type: :uuid
      t.string :provider, null: false, default: "google"
      t.string :email, null: false
      t.string :display_name
      t.string :avatar_url
      t.text :access_token_ciphertext
      t.text :refresh_token_ciphertext
      t.string :access_token_bidx
      t.string :refresh_token_bidx
      t.string :token_scope
      t.datetime :token_expires_at
      t.datetime :last_synced_at
      t.string :status, default: "active"
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :vault_accounts, :email
    add_index :vault_accounts, :access_token_bidx
    add_index :vault_accounts, [:vault_business_id, :provider, :email], unique: true, name: "idx_vault_accounts_unique_provider_email"
  end
end
