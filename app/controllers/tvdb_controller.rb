require 'thetvdb'

class TvdbController < ApplicationController
  def search
    tvdb_response = TheTVDB.search(params[:search_text])
    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end
end
