class AutomaticUpdate
  def self.update_all
    start = Time.now
    start -= 172800 #two days ago
    response = TheTVDB.update(start)
    logger.debug(response)
  end
end
