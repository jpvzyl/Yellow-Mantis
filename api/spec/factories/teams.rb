FactoryBot.define do
  factory :team do
    workspace
    name { "Engineering" }
    sequence(:identifier) { |n| ("AA".."ZZ").to_a[n % 676].ljust(3, "X")[0..2] }
    color { "#6366f1" }

    after(:create) do |team|
      unless team.workflow_states.any?
        # Default states are created by after_create callback
      end
    end
  end
end
