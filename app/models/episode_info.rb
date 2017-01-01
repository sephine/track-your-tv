class EpisodeInfo < ApplicationRecord
  belongs_to :programme_info
  has_many :watched_episodes, inverse_of: :episode_info, dependent: :destroy
  validates :programme_info, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true
  scope :aired, -> { where('"firstAired" != ? AND "firstAired" <= ?', "", Date.today) }
  scope :will_air, -> { where('"firstAired" != ? AND "firstAired" > ?', "", Date.today) }

  def watchable?
    firstAired != "" && firstAired != nil && Date.parse(firstAired) <= Date.today
  end

  def self.next_air_date
    next_episode = self.will_air.order('"firstAired" asc').first
    next_episode == nil ? nil : next_episode.firstAired
  end

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

  def self.update_from_tvdb(programme_info)
    response = TheTVDB.episodes(programme_info.tvdb_ref)
    if response.include?('data')
      data = Hash.new
      response['data'].each do |item|
        if item.is_a?(Array)
          item.each do |real_item|
            data[real_item['id']] = real_item
          end
        else
          data[item['id']] = item
        end
      end

      to_delete = []
      programme_info.episode_infos.each do |current|
        to_delete << current if !data.include?(current.tvdb_ref)
      end
      to_delete.each do |episode_to_delete|
        episode_to_delete.destroy
      end

      data.values.each do |item|
        search = EpisodeInfo.where(tvdb_ref: item['id'])
        if search.length > 0
          episodeObject = search[0]
          episodeObject.update({
            episode_number: item['airedEpisodeNumber'],
            season_number: item['airedSeason'],
            episodeName: item['episodeName'],
            firstAired: item['firstAired'],
            overview: item['overview'],
          })
        else
          programme_info.episode_infos.create({
            tvdb_ref: item['id'],
            episode_number: item['airedEpisodeNumber'],
            season_number: item['airedSeason'],
            episodeName: item['episodeName'],
            firstAired: item['firstAired'],
            overview: item['overview'],
          })
        end
      end
    end
  end
end
