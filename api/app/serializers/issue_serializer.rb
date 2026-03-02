class IssueSerializer
  def self.render(issue, view: :default)
    data = {
      id: issue.id,
      identifier: issue.identifier,
      number: issue.number,
      title: issue.title,
      priority: issue.priority,
      priority_label: issue.priority_label,
      estimate: issue.estimate,
      due_date: issue.due_date,
      sort_order: issue.sort_order,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      state: issue.state ? WorkflowStateSerializer.render(issue.state) : nil,
      assignee: issue.assignee ? UserSerializer.render(issue.assignee) : nil,
      creator: UserSerializer.render(issue.creator),
      labels: issue.labels.map { |l| LabelSerializer.render(l) },
      project: issue.project ? { id: issue.project.id, name: issue.project.name, color: issue.project.color } : nil,
      team: { id: issue.team.id, identifier: issue.team.identifier, name: issue.team.name },
      sub_issue_count: issue.sub_issues.count,
      parent_id: issue.parent_id
    }

    if view == :detail
      data[:description] = issue.description
      data[:started_at] = issue.started_at
      data[:completed_at] = issue.completed_at
      data[:cancelled_at] = issue.cancelled_at
      data[:cycle] = issue.cycle ? { id: issue.cycle.id, name: issue.cycle.name, number: issue.cycle.number } : nil
      data[:parent] = issue.parent ? { id: issue.parent.id, identifier: issue.parent.identifier, title: issue.parent.title } : nil
      data[:sub_issues] = issue.sub_issues.includes(:state, :assignee).map { |si|
        { id: si.id, identifier: si.identifier, title: si.title, priority: si.priority,
          state: si.state ? WorkflowStateSerializer.render(si.state) : nil,
          assignee: si.assignee ? UserSerializer.render(si.assignee) : nil }
      }
    end

    data
  end
end
