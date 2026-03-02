FactoryBot.define do
  factory :workflow_state do
    team
    name { "Todo" }
    color { "#e2e2e2" }
    position { 0 }
    state_type { :unstarted }
  end
end
