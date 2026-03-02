class WorkspaceSerializer
  def self.render(workspace)
    {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      logo: workspace.logo,
      created_at: workspace.created_at
    }
  end
end
