FactoryBot.define do
  factory :label do
    workspace
    name { Faker::Lorem.word.capitalize }
    color { "#3b82f6" }
  end
end
