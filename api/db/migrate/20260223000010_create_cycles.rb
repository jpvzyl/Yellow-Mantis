class CreateCycles < ActiveRecord::Migration[7.1]
  def change
    create_table :cycles, id: :uuid do |t|
      t.references :team, null: false, foreign_key: true, type: :uuid
      t.string :name
      t.integer :number, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :status, null: false, default: 0
      t.timestamps
    end

    add_index :cycles, [:team_id, :number], unique: true
  end
end
