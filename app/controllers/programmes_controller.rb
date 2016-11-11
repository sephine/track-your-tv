class ProgrammesController < ApplicationController
  before_action :authenticate_user!

  def index
    programmes = current_user.programmes.all
    respond_to do |format|
      format.json { render :json => programmes }
      format.html { render :index }
    end
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
      params.require(:programme).permit(:tvdb_ref, :image)
    end
end
