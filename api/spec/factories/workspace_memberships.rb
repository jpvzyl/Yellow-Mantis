FactoryBot.define do
  factory :workspace_membership do
    workspace
    user
    role { :member }
  end
end
