FactoryBot.define do
  factory :issue do
    team
    title { Faker::Lorem.sentence(word_count: 5) }
    priority { 3 }
    association :creator, factory: :user
    state { team.workflow_states.first || association(:workflow_state, team: team) }
  end
end
