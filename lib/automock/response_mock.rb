require 'pathname'

module Automock
  class ResponseMock
    def initialize(context, example)
      @context = context
      @example = example
    end

    def description
      @example.description
    end

    def method
      @context.request.method
    end

    def uri
      @context.request.env['PATH_INFO']
    end

    def response_body
      @context.response.try(:body)
    end

    def filename
      "#{description.gsub(/\s/, '_').gsub(/[?"\\\<>*|]/, '')}.json"
    end

    def mock_data
      {
        description: description,
        method: method,
        uri: uri,
        response_body: response_body
      }.to_json
    end

    def write
      pathname = Pathname.new("mock/#{uri}/#{filename}")
      pathname.parent.mkpath
      pathname.open('w') { |file| file << mock_data }
    end
  end
end
