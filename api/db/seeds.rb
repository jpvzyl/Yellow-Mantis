puts "Seeding database..."

user = User.find_or_create_by!(email: "jp@yellow-mantis.com") do |u|
  u.name = "JP van Zyl"
  u.password = "password123"
  u.password_confirmation = "password123"
  u.theme = "dark"
end

workspace = Workspace.find_or_create_by!(slug: "yellow-mantis") do |w|
  w.name = "Yellow Mantis"
end

WorkspaceMembership.find_or_create_by!(workspace: workspace, user: user) do |m|
  m.role = :owner
end

eng_team = Team.find_or_create_by!(workspace: workspace, identifier: "ENG") do |t|
  t.name = "Engineering"
  t.color = "#6366f1"
end

design_team = Team.find_or_create_by!(workspace: workspace, identifier: "DES") do |t|
  t.name = "Design"
  t.color = "#ec4899"
end

[eng_team, design_team].each do |team|
  TeamMembership.find_or_create_by!(team: team, user: user)
end

bug_label = Label.find_or_create_by!(workspace: workspace, name: "Bug") do |l|
  l.color = "#ef4444"
end
feature_label = Label.find_or_create_by!(workspace: workspace, name: "Feature") do |l|
  l.color = "#3b82f6"
end
improvement_label = Label.find_or_create_by!(workspace: workspace, name: "Improvement") do |l|
  l.color = "#8b5cf6"
end
Label.find_or_create_by!(workspace: workspace, name: "Documentation") do |l|
  l.color = "#06b6d4"
end
Label.find_or_create_by!(workspace: workspace, name: "Performance") do |l|
  l.color = "#f59e0b"
end

project = Project.find_or_create_by!(workspace: workspace, name: "PM Tool MVP") do |p|
  p.description = "Build the Yellow Mantis project management tool"
  p.status = :in_progress
  p.lead = user
  p.start_date = Date.today
  p.target_date = Date.today + 90
  p.color = "#6366f1"
end

backlog = eng_team.workflow_states.find_by(state_type: :backlog)
todo = eng_team.workflow_states.find_by(state_type: :unstarted)
in_progress = eng_team.workflow_states.find_by(state_type: :started)
done = eng_team.workflow_states.find_by(state_type: :completed)

issues_data = [
  { title: "Set up Rails API with JWT authentication", state: done, priority: 1, labels: [feature_label] },
  { title: "Design database schema for issues and teams", state: done, priority: 1, labels: [feature_label] },
  { title: "Build issue CRUD API endpoints", state: in_progress, priority: 1, labels: [feature_label] },
  { title: "Create React frontend with Vite and Tailwind", state: in_progress, priority: 2, labels: [feature_label] },
  { title: "Implement dark theme and design system", state: in_progress, priority: 2, labels: [feature_label] },
  { title: "Build sidebar navigation component", state: todo, priority: 2, labels: [feature_label] },
  { title: "Implement issue list view with status grouping", state: todo, priority: 2, labels: [feature_label] },
  { title: "Add keyboard shortcuts system", state: todo, priority: 3, labels: [improvement_label] },
  { title: "Build command palette (Cmd+K)", state: todo, priority: 3, labels: [feature_label] },
  { title: "Implement kanban board view", state: todo, priority: 3, labels: [feature_label] },
  { title: "Add real-time updates via WebSocket", state: backlog, priority: 3, labels: [feature_label] },
  { title: "Build notification inbox", state: backlog, priority: 3, labels: [feature_label] },
  { title: "Add rich text editor for descriptions", state: backlog, priority: 3, labels: [feature_label] },
  { title: "Fix issue sorting by priority not working", state: todo, priority: 2, labels: [bug_label] },
  { title: "Optimize issue list query performance", state: backlog, priority: 4, labels: [improvement_label] },
  { title: "Write API documentation", state: backlog, priority: 4, labels: [feature_label] },
  { title: "Add project progress tracking", state: backlog, priority: 3, labels: [feature_label] },
  { title: "Implement cycle management", state: backlog, priority: 3, labels: [feature_label] },
  { title: "Build saved views system", state: backlog, priority: 4, labels: [feature_label] },
  { title: "Add bulk issue operations", state: backlog, priority: 3, labels: [improvement_label] },
]

issues_data.each_with_index do |data, i|
  issue = Issue.find_or_create_by!(team: eng_team, title: data[:title]) do |issue|
    issue.state = data[:state]
    issue.priority = data[:priority]
    issue.creator = user
    issue.assignee = user
    issue.project = project
    issue.sort_order = i.to_f
  end
  data[:labels].each do |label|
    IssueLabel.find_or_create_by!(issue: issue, label: label)
  end
end

puts "Seeded: #{User.count} users, #{Workspace.count} workspaces, #{Team.count} teams, #{Issue.count} issues, #{Label.count} labels"

# ─── Company Vault ──────────────────────────────────────

biz1 = Vault::Business.find_or_create_by!(user: user, slug: "yellow-mantis-dev") do |b|
  b.name = "Yellow Mantis"
  b.description = "Product management and development tools"
  b.color = "#6366f1"
  b.website_url = "https://yellow-mantis.com"
  b.position = 0
end

biz2 = Vault::Business.find_or_create_by!(user: user, slug: "acme-consulting") do |b|
  b.name = "Acme Consulting"
  b.description = "Business consulting and advisory services"
  b.color = "#ef4444"
  b.website_url = "https://acme-consulting.com"
  b.position = 1
end

biz3 = Vault::Business.find_or_create_by!(user: user, slug: "pixel-studio") do |b|
  b.name = "Pixel Studio"
  b.description = "Creative design agency"
  b.color = "#ec4899"
  b.position = 2
end

# Vault Pages
pages_data = {
  biz1 => [
    { name: "GitHub Repo", url: "https://github.com/yellow-mantis", category: "github", pinned: true },
    { name: "Heroku Dashboard", url: "https://dashboard.heroku.com", category: "heroku", pinned: true },
    { name: "Vercel Deployments", url: "https://vercel.com/dashboard", category: "hosting" },
    { name: "Google Analytics", url: "https://analytics.google.com", category: "analytics" },
    { name: "Stripe Billing", url: "https://dashboard.stripe.com", category: "billing" },
  ],
  biz2 => [
    { name: "Company Website", url: "https://acme-consulting.com", category: "other", pinned: true },
    { name: "QuickBooks", url: "https://quickbooks.intuit.com", category: "billing" },
    { name: "LinkedIn Page", url: "https://linkedin.com/company/acme", category: "social" },
    { name: "Notion Docs", url: "https://notion.so", category: "docs" },
  ],
  biz3 => [
    { name: "Figma Workspace", url: "https://figma.com", category: "docs", pinned: true },
    { name: "Dribbble Portfolio", url: "https://dribbble.com/pixelstudio", category: "social" },
    { name: "Adobe Creative Cloud", url: "https://creativecloud.adobe.com", category: "other" },
  ],
}

pages_data.each do |biz, pages|
  pages.each_with_index do |data, i|
    Vault::Page.find_or_create_by!(business: biz, url: data[:url]) do |p|
      p.name = data[:name]
      p.category = data[:category]
      p.pinned = data[:pinned] || false
      p.position = i
    end
  end
end

# Vault Documents
docs_data = [
  { biz: biz1, name: "API Documentation", category: "general", desc: "Internal API reference documentation" },
  { biz: biz1, name: "Cloud Infrastructure Agreement", category: "contract", desc: "AWS hosting contract terms", sensitive: true },
  { biz: biz1, name: "Q4 2025 Invoice - AWS", category: "invoice", desc: "Quarterly AWS hosting invoice" },
  { biz: biz2, name: "Client NDA Template", category: "legal", desc: "Standard non-disclosure agreement template", sensitive: true },
  { biz: biz2, name: "Annual Tax Filing 2025", category: "tax", desc: "Complete annual tax return package", sensitive: true },
  { biz: biz3, name: "Brand Guidelines", category: "marketing", desc: "Official Pixel Studio brand book and style guide" },
]

docs_data.each do |data|
  Vault::Document.find_or_create_by!(business: data[:biz], name: data[:name]) do |d|
    d.uploaded_by = user
    d.category = data[:category]
    d.description = data[:desc]
    d.sensitive = data[:sensitive] || false
  end
end

puts "Seeded Vault: #{Vault::Business.count} businesses, #{Vault::Page.count} pages, #{Vault::Document.count} documents"
