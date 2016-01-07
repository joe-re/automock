# Automock

Generate WebAPI mocking response data from your rails application's request-spec.

And run proxy server for mocking response.

Inspired by [autodoc](https://github.com/r7kamura/autodoc).

## Installation

Add this line to your rails application's Gemfile:

```ruby
gem "automock", group: :test
```

Download and install by running:

```
$ bundle install
```

And setup mocking server.

```
$ rake automock:setup
```

This generate `automock` directory under your rails root.  
Mocking server is inside it.
I recommend adding automock directory to .gitignore.

Then run mocking server.

```
$ rake automock:server
```

By default, proxy server use 8001 port and target application using 3000 port.  
Mocking management server use 8000 port.  
Now you can access it, localhost:8000.  
And access localhost:8001, you can receive response by proxy.

## Usage

### Generate data for mocking response
Run rspec with AUTOMOCK=1 to generate mocking data for your request-specs tagged with :automock.

```
AUTOMOCK=1 rspec
```

#### Example

```ruby
RSpec.describe 'users', type: :request do
  describe 'GET /api/v1/users', automock: true do
    before do
      get '/api/v1/users'
    end
    it 'receives 200 and users json' do
      expect(response.status).to eq 200
    end
    # and more example...
  end
end
```

### Mocking response

You can manage mocking data, on or off, by mocking response management server.
By default, mocking management server use 8000 port.
So you can access it.

![management_server_screenshot](https://cloud.githubusercontent.com/assets/4954534/12078401/3621c93c-b254-11e5-9f7e-21bd075bed2e.png)

Selected mocking data is used by proxy.  
Unselected api is passed through normally.

### Configration

You can change automock's using port by rake args.

- automock_port
- rails_port
- proxy_port

Example:
```
$ rake automock:server automock_port=3001 rails_port=3002 proxy_port=3003
```
## Development

After checking out the repo, run `bin/setup` to install dependencies.
If you run mocking server, run `bin/server` to start it.

### spec

Then, run `rake spec` to run the tests for ruby code.  
And change directory to `server`, then run `npm run test` to run the tests for mocking server.  

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/joe-re/automock. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
