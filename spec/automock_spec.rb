require 'spec_helper'
require 'json'

describe Automock do
  before(:all) do
    @file_text = File.open(
      File.expand_path(
        './fixtures/data/api/v1/users/GET_This_is_test_API.json', File.dirname(__FILE__)
      )
    ).read
  end

  describe 'make correct file content' do
    it 'has description' do
      expect(JSON.parse(@file_text)['description']).to eq 'This is test API'
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

    it 'has status_code' do
      expect(JSON.parse(@file_text)['status']).to eq 200
    end
  end
end
