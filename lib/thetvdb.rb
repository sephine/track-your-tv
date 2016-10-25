require 'exceptions'

class TheTVDB
  include HTTParty
  base_uri 'https://api.thetvdb.com'

  def self.search(search_text)
    token_text = self.get_token.text
    query = {name: search_text}
    headers = {"Authorization" => "Bearer #{token_text}", 'Content-Type' => 'application/json'}
    response = get('/search/series', {query: query, headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    response
  end

  private
  def self.get_token
    newest_token = Token.order(:refreshed).last
    if newest_token == nil || newest_token.refreshed + 23.hour < DateTime.now
      return self.get_new_token
    elsif newest_token.refreshed < DateTime.now - 1.hour
      return self.refresh_token(newest_token)
    end
    return newest_token
  end

  def self.get_new_token
    Token.destroy_all
    body = {"apikey": ENV['THETVDB_API_KEY']}.to_json
    headers = {'Content-Type' => 'application/json'}
    response = post('/login', { body: body, headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    token = Token.new(text: response['token'], refreshed: DateTime.now)
    token.save
    return token
  end

  def self.refresh_token(token)
    headers = {"Authorization" => "Bearer #{token.text}", 'Content-Type' => 'application/json'}
    response = get('/refresh_token', {headers: headers})
    return self.get_new_token if response.code == 401
    token.update(text: response['token'], refreshed: DateTime.now)
    return token
  end
end
