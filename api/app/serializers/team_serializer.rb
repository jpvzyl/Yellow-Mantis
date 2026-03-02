class TeamSerializer
  def self.render(team, view: :default)
    data = {
      id: team.id,
      name: team.name,
      identifier: team.identifier,
      description: team.description,
      icon: team.icon,
      color: team.color,
      issue_count: team.issues.count
    }

    if view == :detail
      data[:workflow_states] = team.workflow_states.ordered.map { |s| WorkflowStateSerializer.render(s) }
      data[:members] = team.users.map { |u| UserSerializer.render(u) }
    end

    data
  end
end
