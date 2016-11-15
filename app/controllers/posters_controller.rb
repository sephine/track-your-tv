require 'thetvdb'

class PostersController < ApplicationController

  #REMOVE: moved to model
  def create(series_id)
    search = ProgrammeInfo.where(tvdb_ref: series_id)
    if search.length > 0
      programme_info = search[0]
      response = TheTVDB.posters(series_id)
      if response.include?('data')
        data = response['data']
        data.each do |item|
          poster = programme_info.posters.create({
            tvdb_ref: data['id'],
            thumbnail: data['thumbnail'],
            rating_average: data['ratingsInfo']['average']
          })
        end
      end
    end
  end

end
