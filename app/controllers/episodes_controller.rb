class EpisodesController < ApplicationController
  before_action :authenticate_user!

  def update
    success = false
    search = current_user.programmes.where(tvdb_ref: params[:series_id])
    if search.length > 0
      programme = search.first
      search = programme.episodes.where(tvdb_ref: params[:episode][:tvdb_ref])
      if search.length == 0
        episode = programme.episodes.new(episode_params)
        if episode.save
          success = true
        else
          success = false
        end
      else
        episode = search.first
        if episode.update(episode_params)
          success = true
        else
          success = false
        end
      end
    end

    if success
      respond_to do |format|
        format.json { render json: nil, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: nil, status: 400 }
      end
    end
  end

  private
    def episode_params
      params.require(:episode).permit(:name, :tvdb_ref, :watched)
    end
end
