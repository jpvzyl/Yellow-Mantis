class ProjectSerializer
  def self.render(project, view: :default)
    data = {
      id: project.id,
      name: project.name,
      description: project.description,
      icon: project.icon,
      color: project.color,
      status: project.status,
      start_date: project.start_date,
      target_date: project.target_date,
      lead: project.lead ? UserSerializer.render(project.lead) : nil,
      progress: project.progress,
      issue_count: project.issues.count,
      created_at: project.created_at
    }

    if view == :detail
      data[:teams] = project.teams.map { |t| { id: t.id, name: t.name, identifier: t.identifier } }
    end

    data
  end
end
