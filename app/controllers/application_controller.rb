class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def signed_out_only
    redirect_to root_path if signed_in?
  end
end
