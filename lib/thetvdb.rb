require 'exceptions'

class TheTVDB
  include HTTParty
  base_uri 'https://api.thetvdb.com'

  def self.search(search_text)
    token_text = get_token.text
    query = {name: search_text}
    headers = {"Authorization" => "Bearer #{token_text}", 'Content-Type' => 'application/json'}
    response = get('/search/series', {query: query, headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    response
  end

  def self.series(series_id)
    token_text = get_token.text
    headers = {"Authorization" => "Bearer #{token_text}", 'Content-Type' => 'application/json'}
    response = get("/series/#{series_id}", {headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    response
  end

  def self.episodes(series_id)
    token_text = get_token.text
    headers = {"Authorization" => "Bearer #{token_text}", 'Content-Type' => 'application/json'}
    response = get("/series/#{series_id}/episodes", {headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    return response unless response.include?('data')
    (2..(response['links']['last'].to_i)).each do |page|
      query = {page: "#{page}"}
      new_response = get("/series/#{series_id}/episodes", {query: query, headers: headers})
      response['data'] << new_response['data']
    end
    response
  end

  def self.posters(series_id)
    token_text = get_token.text
    headers = {"Authorization" => "Bearer #{token_text}", 'Content-Type' => 'application/json'}
    query = {keyType: "poster"}
    response = get("/series/#{series_id}/images/query", {query: query, headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    response
  end

  def self.update(start_time)
    token_text = get_token.text
    headers = {"Authorization" => "Bearer #{token_text}", 'Content-Type' => 'application/json'}
    epochStart = start_time.to_i
    query = {fromTime: epochStart}
    response = get("/updated/query", {query: query, headers: headers})
    raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
    response
  end

  class << self
    private
      def get_token
        newest_token = Token.order(:refreshed).last
        if newest_token == nil || newest_token.refreshed + 23.hour < DateTime.now
          return get_new_token
        elsif newest_token.refreshed < DateTime.now - 1.hour
          return refresh_token(newest_token)
        end
        return newest_token
      end

      def get_new_token
        Token.destroy_all
        body = {"apikey": ENV['THETVDB_API_KEY']}.to_json
        headers = {'Content-Type' => 'application/json'}
        response = post('/login', { body: body, headers: headers})
        raise AuthorizationError, 'TheTVDB: Not Authorized' if response.code == 401
        token = Token.new(text: response['token'], refreshed: DateTime.now)
        token.save
        return token
      end

      def refresh_token(token)
        headers = {"Authorization" => "Bearer #{token.text}", 'Content-Type' => 'application/json'}
        response = get('/refresh_token', {headers: headers})
        return get_new_token if response.code == 401
        token.update(text: response['token'], refreshed: DateTime.now)
        return token
      end
  end
end
