require 'thetvdb'

class TrackedProgrammesController < ApplicationController

  def index
    programmes = []
    current_user.tracked_programmes.each do |programmeObject|
      programmeJSON = programmeObject.programme_info.as_json(:only => [:tvdb_ref, :seriesName, :status])
      programmeJSON[:image] = programmeObject[:image]
      programmeJSON[:ignored] = programmeObject[:ignored]

      airedEpisodes = programmeObject.programme_info.episode_infos.aired.count
      logger.debug("AIRED EPISODES")
      logger.debug(airedEpisodes)
      watchedEpisodes = programmeObject.watched_episodes.count
      logger.debug("WATCHED EPISODES")
      logger.debug(watchedEpisodes)
      unwatchedEpisodes = airedEpisodes - watchedEpisodes
      programmeJSON[:unwatched_episodes] = unwatchedEpisodes

      nextAirDate = programmeObject.programme_info.episode_infos.next_air_date
      programmeJSON[:nextAirDate] = nextAirDate

      lastUpdated = programmeObject.watched_episodes.last_updated
      programmeJSON[:lastUpdated] = lastUpdated

      programmes << programmeJSON
    end

    respond_to do |format|
      format.json { render :json => programmes }
    end
  end

  def show
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    programmeObject = nil
    success = true
    if search.length > 0
      programmeObject = search[0]
      #programmeObject.update_from_tvdb #TODO: REMOVE
    else
      programmeObject = ProgrammeInfo.create_from_tvdb(params[:series_id])
      success = false if programmeObject == nil
    end

    programmeJSON = nil
    if success
      programmeJSON = programmeObject.as_json(:except => [:id, :lastUpdated, :created_at, :updated_at])
      programmeJSON[:episodes] = programmeObject.episode_infos.as_json(:except => [:programme_info_id,  :created_at, :updated_at])
      programmeJSON[:episodes].each do |episode|
        episode[:watchable] = false
        episode[:watched] = false
      end
      programmeJSON[:posters] = programmeObject.posters.as_json(:only => [:rating_average, :thumbnail])
      search = current_user.tracked_programmes.where(programme_info_id: programmeObject[:id])
      if search.length > 0
        programmeJSON[:image] = search[0][:image]
        programmeJSON[:ignored] = search[0][:ignored]
        programmeJSON[:tracked] = true
        watched_episodes = search[0].watched_episodes
        watched_set = search[0].watched_episodes.map {|x| x[:episode_info_id]}.to_set
        programmeJSON[:episodes].each do |episode|
          if episode['firstAired'] != nil && episode['firstAired'] != "" && Date.parse(episode['firstAired']) <= Date.today
            episode[:watchable] = true
            episode[:watched] = watched_set.include?(episode['id'])
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
    success = false
    if search.length > 0
      programme = current_user.tracked_programmes.new({
        programme_info_id: search[0].id,
        image: params[:image],
        ignored: false
      });
      success = true if programme.save
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

  def update
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = false
    if search.length > 0
      search = current_user.tracked_programmes.where(programme_info_id: search[0].id)
      if search.length > 0
        updated = search[0].update({
          image: params[:image],
          ignored: params[:ignored]
        });
        success = true if updated
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

  def delete
    search = ProgrammeInfo.where(tvdb_ref: params[:series_id])
    success = false
    if search.length > 0
      search = current_user.tracked_programmes.where(programme_info_id: search[0].id)
      if search.length > 0
        success = true if search[0].destroy
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
