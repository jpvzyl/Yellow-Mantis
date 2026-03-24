puts "Seeding database..."

user = User.find_or_create_by!(email: "jp@yellow-mantis.com") do |u|
  u.name = "JP van Zyl"
  u.password = "password123"
  u.password_confirmation = "password123"
  u.theme = "dark"
end

company = Company.find_or_create_by!(slug: "yellow-mantis") do |c|
  c.name = "Yellow Mantis"
  c.color = "#6366f1"
end

CompanyMembership.find_or_create_by!(company: company, user: user) do |m|
  m.role = :admin
end

workspace = Workspace.find_or_create_by!(slug: "yellow-mantis") do |w|
  w.name = "Yellow Mantis"
end
workspace.update!(company: company) unless workspace.company == company

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

puts "Seeded: #{User.count} users, #{Company.count} companies, #{Workspace.count} workspaces, #{Team.count} teams, #{Label.count} labels"
