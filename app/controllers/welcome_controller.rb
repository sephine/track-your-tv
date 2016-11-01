class WelcomeController < ApplicationController
  before_action :signed_out_only
end
