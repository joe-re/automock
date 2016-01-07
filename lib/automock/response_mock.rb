require 'pathname'

module Automock
  class ResponseMock
    def initialize(context, example)
      @context = context
      @example = example
    end

    def description
      @example.try(:example_group).try(:description) || @example.description
    end

    def method
      @context.request.method
    end

    def uri
      @context.request.env['PATH_INFO']
    end

    def response_header
      @context.response.try(:header)
    end

    def status
      @context.response.try(:status)
    end

    def response_body
      @context.response.try(:body)
    end

    def filename
      "#{method}_#{description.gsub(/\s/, '_').gsub(/[?"\\\<>*|]/, '')}.json"
    end

    def mock_data
      {
        description: description,
        method: method,
        uri: uri,
        status: status,
        response_header: response_header,
        response_body: response_body
      }.to_json
    end

    def write
      pathname = Pathname.new("#{Rails.root}/automock/data/#{uri}/#{filename}")
      pathname.parent.mkpath
      pathname.open('w') { |file| file << mock_data }
    end
  end
end
