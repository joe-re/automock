require 'spec_helper'
require 'JSON'

describe Automock do
  before(:all) do
    File.open('spec/dummy/automock/data/api/v1/users/get_receives_200_and_users_json.json') do |file|
      @file_text = file.read
    end
  end

  describe 'make correct file content' do
    it 'has description' do
      expect(JSON.parse(@file_text)['description']).to eq 'receives 200 and users json'
    end

    it 'has HTTP method' do
      expect(JSON.parse(@file_text)['method']).to eq 'GET'
    end

    it 'has uri' do
      expect(JSON.parse(@file_text)['uri']).to eq '/api/v1/users'
    end

    it 'has response header' do
      expect(JSON.parse(@file_text)['response_header']).to include 'Content-Type'
    end

    let(:expected_body) { { users: [{ user: { name: 'dummy user' } }] }.to_json }
    it 'has response body' do
      expect(JSON.parse(@file_text)['response_body']).to eq expected_body
    end
  end
end
