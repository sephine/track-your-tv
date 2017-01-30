class UpdateProgrammeWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'low'

  def perform(id)
    programmeInfo = ProgrammeInfo.find(id)
    programmeInfo.update_from_tvdb  
  end
end
