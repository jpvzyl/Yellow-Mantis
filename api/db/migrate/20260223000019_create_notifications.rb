class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :actor, foreign_key: { to_table: :users }, type: :uuid
      t.references :issue, foreign_key: true, type: :uuid
      t.integer :notification_type, null: false
      t.jsonb :data, default: {}
      t.datetime :read_at
      t.datetime :snoozed_until
      t.datetime :archived_at
      t.timestamps
    end

    add_index :notifications, [:user_id, :read_at]
  end
end
