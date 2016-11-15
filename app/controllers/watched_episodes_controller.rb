class WatchedEpisodesController < ApplicationController

  def update
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = false
    if search.length > 0
      programmeInfo = search[0]
      search = current_user.tracked_programmes.where(programme_info_id: programmeInfo[:id])
      if search.length > 0
        trackedProgramme = search[0]
        params[:episode_array].each do |index, epObj|
          search = programmeInfo.episode_infos.where(tvdb_ref: epObj[:tvdb_ref])
          if search.length > 0
            episodeInfo = search[0]
            search = trackedProgramme.watched_episodes.where(episode_info_id: episodeInfo[:id])
            if search.length > 0
              success = true
              if epObj[:watched] == "false"
                search[0].destroy
              end
            elsif search.length == 0
              if epObj[:watched] == "true"
                watchedEpisode = trackedProgramme.watched_episodes.new({
                  episode_info_id: episodeInfo.id,
                  watched: true
                });
                success = true if watchedEpisode.save
              else
                success = true
              end
            end
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
end
