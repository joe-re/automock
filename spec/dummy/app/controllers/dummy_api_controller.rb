class DummyApiController < ApplicationController
  def index
    render json: {
      users: [user: { name: 'dummy user' }]
    }
  end
end
