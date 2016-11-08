class ProgrammesController < ApplicationController
  before_action :authenticate_user!

  def index
    @programmes = Programme.all
  end

  def search
    @search_text = params[:q]
  end

  def show
    @series_name = params[:name]
    @series_id = params[:id]
  end

  def create
    @programme = current_user.programmes.new(programme_params)
    if @programme.save
      respond_to do |format|
        format.json { render json: nil, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: nil, status: 400 }
      end
    end
  end

  private
    def programme_params
      params.require(:programme).permit(:name, :tvdb_ref)
    end
end
