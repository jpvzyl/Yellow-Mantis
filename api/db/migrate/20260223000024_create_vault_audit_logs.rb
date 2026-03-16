class CreateVaultAuditLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :vault_audit_logs, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :vault_business, foreign_key: true, type: :uuid
      t.string :action, null: false
      t.string :resource_type
      t.uuid :resource_id
      t.string :ip_address
      t.string :user_agent
      t.jsonb :details, default: {}

      t.timestamps
    end

    add_index :vault_audit_logs, [:user_id, :created_at]
    add_index :vault_audit_logs, [:vault_business_id, :created_at]
    add_index :vault_audit_logs, [:resource_type, :resource_id]
  end
end
