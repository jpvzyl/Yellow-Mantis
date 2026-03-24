class CreateCompanies < ActiveRecord::Migration[7.1]
  def change
    create_table :companies, id: :uuid do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.string :logo
      t.string :color, default: "#6366f1"
      t.timestamps
    end

    add_index :companies, :slug, unique: true
  end
end
