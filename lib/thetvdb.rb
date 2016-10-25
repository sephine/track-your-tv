class TheTVDB
  include HTTParty
  base_uri 'https://api.thetvdb.com'

  def self.login
    response = post('/login', { body: {"apikey": ENV['THETVDB_API_KEY']}.to_json, headers: { 'Content-Type' => 'application/json' }})
  end
end
