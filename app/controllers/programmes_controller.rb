class ProgrammesController < ApplicationController
  def index
    @programmes = Programme.all
  end
end
