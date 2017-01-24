require 'thetvdb'

class ProgrammeInfosController < ApplicationController

  def search
    tvdb_response = TheTVDB.search(params[:search_text])
    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end

  def show
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    programmeObject = nil
    success = true
    if search.length > 0
      programmeObject = search[0]
    else
      programmeObject = ProgrammeInfo.create_from_tvdb(params[:series_id], true)
      success = false if programmeObject == nil
    end

    programmeJSON = nil
    if success
      programmeJSON = programmeObject.as_json(:only => [:tvdb_ref, :seriesName, :genre, :overview, :ratingCount])
      programmeJSON[:posters] = programmeObject.posters.as_json(:only => [:rating_average, :thumbnail, :url])
    end

    respond_to do |format|
      if success
        format.json { render :json => programmeJSON }
      else
        format.json { render json: nil, status: 400 }
      end
    end
  end

end
