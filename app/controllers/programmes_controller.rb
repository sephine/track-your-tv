class ProgrammesController < ApplicationController
  before_filter :authenticate_user!

  def index
    @programmes = Programme.all
  end
end
