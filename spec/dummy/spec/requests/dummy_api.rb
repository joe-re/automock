require_relative '../rails_helper'

RSpec.describe 'users', type: :request do
  describe 'GET /api/v1/users', automock: true do
    before do
      get '/api/v1/users'
    end
    it 'receives 200 and users json' do
      expect(response.status).to eq 200
    end
  end
end
