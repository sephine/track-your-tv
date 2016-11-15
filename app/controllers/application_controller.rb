class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def signed_out_only
    redirect_to root_path if signed_in?
  end

  def check_format
    redirect_to root_path unless params[:format] == 'json' || request.headers["Accept"] =~ /json/
  end
end
