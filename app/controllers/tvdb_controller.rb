require 'thetvdb'

class TvdbController < ApplicationController
  respond_to :json

  def search
    tvdb_response = TheTVDB.search(params[:search_text])
    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end

  def series
    response = TheTVDB.series(params[:series_id])
    if response.include?('data')
      poster_response = TheTVDB.posters(params[:series_id])
      if poster_response.include?('data')
        response['data']['posters'] = poster_response['data']
      else
        response['data']['posters'] = []
      end
    end

    respond_to do |format|
      format.json { render :json => response }
    end
  end

  def episodes
    #sort out issue where the episodes above 100 are split into a seperate array.
    tvdb_response = TheTVDB.episodes(params[:series_id])
    to_add = []
    to_delete = []
    (0...(tvdb_response['data'].length)).each do |i|
      element = tvdb_response['data'][i]
      if element.is_a?(Array)
        to_add += element
        to_delete << i
      end
    end
    to_delete.reverse.each do |i|
      tvdb_response['data'].delete_at(i)
    end
    tvdb_response['data'] += to_add

    #add watched property
    search = current_user.programmes.where(tvdb_ref: params[:series_id])
    if search.length > 0
      programme = search.first
      tvdb_response['data'].each do |epObj|
          search = programme.episodes.where(tvdb_ref: epObj['id'])
          if search.length > 0
            episode = search.first
            epObj['watched'] = episode.watched
          else
            epObj['watched'] = false
          end
      end
    end

    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end
end
