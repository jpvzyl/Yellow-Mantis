class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email, null: false
      t.string :name, null: false
      t.string :display_name
      t.string :avatar_url
      t.string :password_digest, null: false
      t.string :timezone, default: "UTC"
      t.string :theme, default: "dark"
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
