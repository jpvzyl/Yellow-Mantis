class CreateIssueActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :issue_activities, id: :uuid do |t|
      t.references :issue, null: false, foreign_key: true, type: :uuid
      t.references :user, foreign_key: true, type: :uuid
      t.string :field, null: false
      t.string :old_value
      t.string :new_value
      t.timestamps
    end
  end
end
