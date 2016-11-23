require 'thetvdb'

class TrackedProgrammesController < ApplicationController

  def index
    programmes = []
    current_user.tracked_programmes.each do |programmeObject|
      programmeJSON = programmeObject.programme_info.as_json(:only => [:tvdb_ref, :seriesName, :status])
      programmeJSON[:image] = programmeObject[:image]
      programmeJSON[:ignored] = programmeObject[:ignored]
      unwatchedEpisodes = 0
      nextAirDate = nil
      lastUnwatchedAirDate = nil
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
            if lastUnwatchedAirDate == nil || (dateObject != nil && dateObject > lastUnwatchedAirDate)
              lastUnwatchedAirDate = dateObject
            end
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
      if lastUnwatchedAirDate == nil
        programmeJSON[:lastUnwatchedAirDate] = nil
      else
        programmeJSON[:lastUnwatchedAirDate] = "#{lastUnwatchedAirDate.year}-#{lastUnwatchedAirDate.month}-#{lastUnwatchedAirDate.day}-#{lastUnwatchedAirDate.hour}-#{lastUnwatchedAirDate.min}"
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
    success = true
    if search.length > 0
      programmeObject = search[0]
    else
      programmeObject = ProgrammeInfo.create_from_tvdb(params[:series_id])
      success = false if programmeObject == nil
    end

    programmeJSON = nil
    if success
      programmeJSON = programmeObject.as_json(:except => [:id, :lastUpdated, :created_at, :updated_at])
      programmeJSON[:episodes] = programmeObject.episode_infos.as_json(:except => [:id, :programme_info_id,  :created_at, :updated_at])
      programmeJSON[:episodes].each do |episode|
        episode[:watched] = false
      end
      programmeJSON[:posters] = programmeObject.posters.as_json(:only => [:rating_average, :thumbnail])
      search = current_user.tracked_programmes.where(programme_info_id: programmeObject[:id])
      if search.length > 0
        programmeJSON[:image] = search[0][:image]
        programmeJSON[:ignored] = search[0][:ignored]
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
