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

  def self.update_from_tvdb(programme_info)
    response = TheTVDB.posters(programme_info.tvdb_ref)
    if response.include?('data')
      data = response['data']
      to_delete = []
      programme_info.posters.each do |current|
        delete = true
        data.each do |item|
          if item['id'] == current.tvdb_ref
            delete = false
            break
          end
        end
        to_delete << current if delete
      end
      to_delete.each do |poster_to_delete|
        poster_to_delete.destroy
      end

      data.each do |item|
        search = Poster.where(tvdb_ref: item['id'])
        if search.length > 0
          posterObject = search[0]
          posterObject.update({
            thumbnail: item['thumbnail'],
            rating_average: item['ratingsInfo']['average']
          })
        else
          programme_info.posters.create({
            tvdb_ref: item['id'],
            thumbnail: item['thumbnail'],
            rating_average: item['ratingsInfo']['average']
          })
        end
      end
    end
  end
end
