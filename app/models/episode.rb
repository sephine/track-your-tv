class Episode < ApplicationRecord
  belongs_to :programme
  belongs_to :episode_info
  validates :programme, :episode_info, presence: true
  validates :episode_info_id, uniqueness: { scope: :programme_id, message: "This episode is already being tracked." }
end
