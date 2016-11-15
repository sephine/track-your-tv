class TrackedProgramme < ApplicationRecord
  belongs_to :user
  belongs_to :programme_info
  has_many :watched_episodes, inverse_of: :tracked_programme, dependent: :destroy
  validates :user, :programme_info, presence: true
  validates :programme_info, uniqueness: { scope: :user_id, message: "Each series can only be stored once per user." }
end
