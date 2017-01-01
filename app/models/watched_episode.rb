class WatchedEpisode < ApplicationRecord
  belongs_to :tracked_programme
  belongs_to :episode_info
  validates :tracked_programme, :episode_info, presence: true
  validates :episode_info_id, uniqueness: { scope: :tracked_programme_id, message: "This episode is already being tracked." }

  def self.last_updated
    last_updated_episode = self.order('updated_at asc').last
    last_updated_episode == nil ? nil : last_updated_episode.updated_at
  end
end
