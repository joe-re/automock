Rails.application.routes.draw do
  get path: '/api/v1/users', controller: :dummy_api, action: 'index'
end
