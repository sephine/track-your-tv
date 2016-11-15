class EpisodeInfo < ApplicationRecord
  belongs_to :programme_info
  has_many :watched_episodes, inverse_of: :episode_info, dependent: :destroy
  validates :programme_info, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true

  def self.create_from_tvdb(programme_info)
    response = TheTVDB.episodes(programme_info.tvdb_ref)
    if response.include?('data')
      data = response['data']
      data.each do |item|
        if item.is_a?(Array)
          item.each do |real_item|
            create_from_tvdb_single_episode(programme_info, real_item)
          end
        else
          create_from_tvdb_single_episode(programme_info, item)
        end
      end
    end
  end

  def self.create_from_tvdb_single_episode(programme_info, item)
    programme_info.episode_infos.build({
      tvdb_ref: item['id'],
      episode_number: item['airedEpisodeNumber'],
      season_number: item['airedSeason'],
      episodeName: item['episodeName'],
      firstAired: item['firstAired'],
      overview: item['overview'],
    })
  end
end
