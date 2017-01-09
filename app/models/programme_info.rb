class ProgrammeInfo < ApplicationRecord
  has_many :tracked_programmes, inverse_of: :programme_info, dependent: :destroy
  has_many :episode_infos, inverse_of: :programme_info, dependent: :destroy
  has_many :posters, inverse_of: :programme_info, dependent: :destroy
  validates :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true

  def self.temp()
    puts "Sidekiq is working!!"
    result = ProgrammeInfo.all
  end

  def self.create_from_tvdb(series_id)
    response = TheTVDB.series(series_id)
    if response.include?('data')
      data = response['data']
      programmeInfo = self.new({
        tvdb_ref: data['id'],
        seriesName: data['seriesName'],
        status: data['status'],
        firstAired: data['firstAired'],
        network: data['network'],
        runtime: data['runtime'],
        genre: data['genre'].join(", "),
        overview: data['overview'],
        lastUpdated: data['lastUpdated'],
        airsDayOfWeek: data['airsDayOfWeek'],
        airsTime: data['airsTime'],
        imdbID: data['imdbId'],
        ratingCount: data['siteRatingCount']
      });
      Poster.create_from_tvdb(programmeInfo)
      EpisodeInfo.create_from_tvdb(programmeInfo)
      ProgrammeInfo.import [programmeInfo], recursive: true
      return programmeInfo
    end
    return nil
  end

  def update_from_tvdb
    response = TheTVDB.series(self.tvdb_ref)
    if response.include?('data')
      data = response['data']
      self.update({
        seriesName: data['seriesName'],
        status: data['status'],
        firstAired: data['firstAired'],
        network: data['network'],
        runtime: data['runtime'],
        genre: data['genre'].join(", "),
        overview: data['overview'],
        lastUpdated: data['lastUpdated'],
        airsDayOfWeek: data['airsDayOfWeek'],
        airsTime: data['airsTime'],
        imdbID: data['imdbId'],
        ratingCount: data['siteRatingCount']
      });
      Poster.update_from_tvdb(self)
      EpisodeInfo.update_from_tvdb(self)
      return self
    end
    return nil
  end

end
