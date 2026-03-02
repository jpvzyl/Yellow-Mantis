class CreateProjectTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :project_teams, id: :uuid do |t|
      t.references :project, null: false, foreign_key: true, type: :uuid
      t.references :team, null: false, foreign_key: true, type: :uuid
      t.timestamps
    end

    add_index :project_teams, [:project_id, :team_id], unique: true
  end
end
