Rails.application.routes.draw do
  
  resources :users
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
