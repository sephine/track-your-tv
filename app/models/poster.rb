class Poster < ApplicationRecord
  belongs_to :programme_info
  validates :programme_info, :tvdb_ref, presence: true
  validates :tvdb_ref, uniqueness: true

  def self.create_from_tvdb(programme_info)
    response = TheTVDB.posters(programme_info.tvdb_ref)
    if response.include?('data')
      data = response['data']
      data.each do |item|
        programme_info.posters.build({
          tvdb_ref: item['id'],
          thumbnail: item['thumbnail'],
          rating_average: item['ratingsInfo']['average']
        })
      end
    end
  end
end
