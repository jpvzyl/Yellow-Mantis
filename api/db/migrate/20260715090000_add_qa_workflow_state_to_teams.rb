class AddQaWorkflowStateToTeams < ActiveRecord::Migration[7.1]
  disable_ddl_transaction!

  def up
    say_with_time "Backfilling QA workflow state for existing teams" do
      Team.find_each do |team|
        Team.transaction do
          next if team.workflow_states.exists?(state_type: WorkflowState.state_types[:in_review])

          # Slot QA at position 3, bumping completed/cancelled (or anything at >=3) down by one.
          team.workflow_states.where("position >= ?", 3).order(position: :desc).each do |state|
            state.update_column(:position, state.position + 1)
          end

          team.workflow_states.create!(
            name: "QA",
            color: "#a855f7",
            position: 3,
            state_type: :in_review
          )
        end
      end
    end
  end

  def down
    say_with_time "Removing QA workflow states" do
      Team.find_each do |team|
        Team.transaction do
          qa_states = team.workflow_states.where(state_type: WorkflowState.state_types[:in_review])
          next if qa_states.empty?

          qa_states.destroy_all

          team.workflow_states.where("position > ?", 3).order(:position).each do |state|
            state.update_column(:position, state.position - 1)
          end
        end
      end
    end
  end
end
