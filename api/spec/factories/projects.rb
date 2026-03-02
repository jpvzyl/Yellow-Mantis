FactoryBot.define do
  factory :project do
    workspace
    name { Faker::App.name }
    color { "#6366f1" }
    status { :planned }
  end
end
