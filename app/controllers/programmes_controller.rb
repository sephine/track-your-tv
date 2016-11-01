class ProgrammesController < ApplicationController
  before_action :authenticate_user!

  def index
    @programmes = Programme.all
  end

  def search
    @search_text = params[:q]
  end
end
