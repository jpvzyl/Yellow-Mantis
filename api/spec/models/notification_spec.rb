require "rails_helper"

RSpec.describe Notification, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:actor).optional }
    it { should belong_to(:issue).optional }
  end

  describe "scopes" do
    let(:user) { create(:user) }

    it ".unread returns only unread notifications" do
      read = Notification.create!(user: user, notification_type: :issue_assigned, read_at: Time.current)
      unread = Notification.create!(user: user, notification_type: :issue_commented)

      expect(Notification.unread).to include(unread)
      expect(Notification.unread).not_to include(read)
    end
  end
end
