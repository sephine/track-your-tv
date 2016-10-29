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
    tvdb_response = TheTVDB.series(params[:series_id])
    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end
end
