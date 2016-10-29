class ProgrammesController < ApplicationController
  def index
    @programmes = Programme.all
  end

  def search
    @search_text = params[:q]
  end
end
