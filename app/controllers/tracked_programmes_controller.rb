class TrackedProgrammesController < ApplicationController

  def index
    programmes = []
    current_user.tracked_programmes.each do |programmeObject|
      programmeJSON = programmeObject.programme_info.as_json(:only => [:tvdb_ref, :seriesName, :status])
      programmeJSON[:image] = programmeObject[:image]
      unwatchedEpisodes = 0
      nextAirDate = nil
      programmeObject.programme_info.episode_infos.each do |episodeInfo|
        search = programmeObject.watched_episodes.where(episode_info_id: episodeInfo.id)
        if search.length == 0 && episodeInfo.firstAired != nil && episodeInfo.firstAired != ""
          dateObject = nil
          begin
            dateObject = DateTime.parse(episodeInfo.firstAired + " " + programmeObject.programme_info.airsTime)
          rescue
            dateObject = nil
          end
          if dateObject != nil && dateObject <= Date.today
            unwatchedEpisodes += 1
          elsif nextAirDate == nil || (dateObject != nil && dateObject < nextAirDate)
            nextAirDate = dateObject
          end
        end
      end
      programmeJSON[:unwatched_episodes] = unwatchedEpisodes
      if nextAirDate == nil
        programmeJSON[:nextAirDate] = nil
      else
        programmeJSON[:nextAirDate] = "#{nextAirDate.year}-#{nextAirDate.month}-#{nextAirDate.day}-#{nextAirDate.hour}-#{nextAirDate.min}"
      end
      programmes << programmeJSON
    end

    respond_to do |format|
      format.json { render :json => programmes }
    end
  end

  def show
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    programmeObject = nil
    programmeJSON = nil
    success = true
    if search.length > 0
      programmeObject = search[0]
      programmeJSON = search[0].as_json(:except => [:id, :lastUpdated, :created_at, :updated_at])
    else
      programmeObject = ProgrammeInfo.create_from_tvdb(params[:series_id])
      if programmeObject != nil
        programmeJSON = programmeObject.as_json(:except => [:id, :lastUpdated, :created_at, :updated_at])
      else
        success = false
      end
    end

    if programmeObject != nil
      logger.debug(programmeObject.episode_infos.inspect)
      programmeJSON[:episodes] = programmeObject.episode_infos.as_json(:except => [:id, :programme_info_id,  :created_at, :updated_at])
      programmeJSON[:episodes].each do |episode|
        episode[:watched] = false
      end
      programmeJSON[:posters] = programmeObject.posters.as_json(:only => [:rating_average, :thumbnail])
      search = current_user.tracked_programmes.where(programme_info_id: programmeObject[:id])
      if search.length > 0
        programmeJSON[:image] = search[0][:image]
        programmeJSON[:tracked] = true
        search = search[0].watched_episodes.each do |watched_episode|
          logger.debug(watched_episode.episode_info.inspect)
          programmeJSON[:episodes].each do |episode|
            if episode['tvdb_ref'] == watched_episode.episode_info[:tvdb_ref]
              episode[:watched] = true
              break
            end
          end
        end
      else
        programmeJSON[:tracked] = false
      end
    end

    respond_to do |format|
      if success
        format.json { render :json => programmeJSON }
      else
        format.json { render json: nil, status: 400 }
      end
    end
  end

  def create
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = true
    if search.length > 0
      programme = current_user.tracked_programmes.new({
        programme_info_id: search[0].id,
        image: params[:image]
      });
      success = false if !programme.save
    else
      success = false
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
