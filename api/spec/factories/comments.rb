FactoryBot.define do
  factory :comment do
    issue
    user
    body { Faker::Lorem.paragraph }
  end
end
