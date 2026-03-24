class CompanySerializer
  def self.render(company, membership: nil)
    data = {
      id: company.id,
      name: company.name,
      slug: company.slug,
      description: company.description,
      logo: company.logo,
      color: company.color,
      created_at: company.created_at
    }

    if membership
      data[:role] = membership.role
      data[:workspace_slug] = company.workspaces.first&.slug
    end

    data
  end
end
