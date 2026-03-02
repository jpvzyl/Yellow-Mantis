FactoryBot.define do
  factory :workspace do
    name { Faker::Company.name }
    slug { name.parameterize + "-#{SecureRandom.hex(3)}" }
  end
end
