require 'thetvdb'

class TvdbController < ApplicationController
  def login
    tvdb_response = TheTVDB.login
    respond_to do |format|
      format.json { render :json => tvdb_response }
    end
  end
end
