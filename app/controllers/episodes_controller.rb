class EpisodesController < ApplicationController
  before_action :authenticate_user!

  def update
    success = false
    search = current_user.programmes.where(tvdb_ref: episode_params[:series_id])
    if search.length > 0
      programme = search.first
      episode_params[:episode_array].each do |index, epObj|
        search = programme.episodes.where(tvdb_ref: epObj[:tvdb_ref])
        if search.length == 0
          episode = programme.episodes.new(epObj)
          if episode.save
            success = true
          else
            success = false
            break
          end
        else
          episode = search.first
          if episode.update(epObj)
            success = true
          else
            success = false
            break
          end
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
      params.permit(:series_id, episode_array: [:name, :tvdb_ref, :watched])
    end
end
