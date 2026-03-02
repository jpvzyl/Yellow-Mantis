class CreateIssueLabels < ActiveRecord::Migration[7.1]
  def change
    create_table :issue_labels, id: :uuid do |t|
      t.references :issue, null: false, foreign_key: true, type: :uuid
      t.references :label, null: false, foreign_key: true, type: :uuid
      t.timestamps
    end

    add_index :issue_labels, [:issue_id, :label_id], unique: true
  end
end
