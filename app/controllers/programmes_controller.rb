class ProgrammesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def search
    @search_text = params[:q]
  end

  def show
    @series_name = params[:name]
    @series_id = params[:id]
  end
end
