class CreateFavorites < ActiveRecord::Migration[7.1]
  def change
    create_table :favorites, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :favoritable_type, null: false
      t.uuid :favoritable_id, null: false
      t.integer :position, default: 0
      t.timestamps
    end

    add_index :favorites, [:user_id, :favoritable_type, :favoritable_id], unique: true, name: "idx_favorites_unique"
    add_index :favorites, [:favoritable_type, :favoritable_id]
  end
end
