class WelcomeController < ApplicationController
  before_action :signed_out_only

  def letsencrypt
    render text: ENV['LETS_ENCRYPT_RESPONSE']
  end
end
