require 'thetvdb'

class ProgrammeInfosController < ApplicationController

  def search
    tvdb_response = TheTVDB.search(params[:search_text])
    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end

  def full_search
    tvdb_response = TheTVDB.search(params[:search_text])
    success = true
    if tvdb_response.include?('data')
      data = tvdb_response['data']
      (0...data.length).each do |i|
        search = ProgrammeInfo.where(tvdb_ref: data[i]['id'])
        programme_info = nil
        if search.length > 0
          programme_info = search[0]
          data[i] = programme_info.as_json(:only => [:tvdb_ref, :seriesName, :genre, :overview, :ratingCount])
        else
          programme_info = ProgrammeInfo.create_from_tvdb(data[i]['id'])
          if programme_info != nil
            data[i] = programme_info.as_json(:only => [:tvdb_ref, :seriesName, :genre, :overview, :ratingCount])
          else
            success = false
            break
          end
        end
        postersArray = []
        programme_info.posters.each do |poster|
          postersArray << poster.as_json(:only => [:rating_average, :thumbnail])
        end
        data[i]['posters'] = postersArray
      end
    end

    respond_to do |format|
      if success
        format.json { render :json => tvdb_response }
      else
        format.json { render json: nil, status: 400 }
      end
    end
  end

end
