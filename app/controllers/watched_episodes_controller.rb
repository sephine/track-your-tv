class WatchedEpisodesController < ApplicationController

  def update
    search = ProgrammeInfo.where(tvdb_ref: watched_params[:series_id])
    success = false
    if search.length > 0
      programmeInfo = search[0]
      search = current_user.tracked_programmes.where(programme_info_id: programmeInfo[:id])
      if search.length > 0
        trackedProgramme = search[0]
        episodeInfos = programmeInfo.episode_infos.where(tvdb_ref: watched_params[:episode_array])
        episodeIDs = episodeInfos.map {|x| x.id}
        watchedEpisodes = trackedProgramme.watched_episodes.where(episode_info_id: episodeIDs)

        if watched_params[:watched] == "true"
          watchedEpisodeSet = watchedEpisodes.map {|x| x.episode_info_id}.to_set
          success = true
          episodeInfos.each do |episode|
            if episode.watchable? && !watchedEpisodeSet.include?(episode.id)
              watchedEpisode = trackedProgramme.watched_episodes.new({
                episode_info_id: episode.id,
                watched: true
              });
              unless watchedEpisode.save
                success = false
                break
              end
            end
          end
        else
          success = true
          watchedEpisodes.each do |episode|
            episode.destroy
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
    def watched_params
      params.permit(:series_id, :watched, episode_array: [])
    end
end
