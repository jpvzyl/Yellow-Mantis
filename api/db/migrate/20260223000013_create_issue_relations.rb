class CreateIssueRelations < ActiveRecord::Migration[7.1]
  def change
    create_table :issue_relations, id: :uuid do |t|
      t.references :issue, null: false, foreign_key: true, type: :uuid
      t.references :related_issue, null: false, foreign_key: { to_table: :issues }, type: :uuid
      t.integer :relation_type, null: false, default: 0
      t.timestamps
    end

    add_index :issue_relations, [:issue_id, :related_issue_id, :relation_type], unique: true, name: "idx_issue_relations_unique"
  end
end
