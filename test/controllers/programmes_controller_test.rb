require 'test_helper'

class ProgrammesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get programmes_index_url
    assert_response :success
  end

end
