class CreateVaultCursorChats < ActiveRecord::Migration[7.1]
  def change
    create_table :vault_cursor_chats, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :vault_business, foreign_key: true, type: :uuid
      t.string :chat_uuid, null: false
      t.string :project_name
      t.string :title
      t.text :summary
      t.string :source_path
      t.integer :message_count, default: 0
      t.integer :file_size, default: 0
      t.datetime :chat_started_at
      t.datetime :chat_ended_at
      t.jsonb :metadata, default: {}
      t.boolean :starred, default: false

      t.timestamps
    end

    add_index :vault_cursor_chats, [:user_id, :chat_uuid], unique: true
    add_index :vault_cursor_chats, :starred
  end
end
