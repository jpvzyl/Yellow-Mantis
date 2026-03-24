class CreateCompanyMemberships < ActiveRecord::Migration[7.1]
  def change
    create_table :company_memberships, id: :uuid do |t|
      t.references :company, type: :uuid, null: false, foreign_key: true
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.integer :role, default: 0, null: false
      t.datetime :joined_at, default: -> { "CURRENT_TIMESTAMP" }
      t.timestamps
    end

    add_index :company_memberships, [:company_id, :user_id], unique: true
  end
end
