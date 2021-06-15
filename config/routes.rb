Rails.application.routes.draw do
  resources :quizzes, expect: %i[new edit], param: :slug
  resource :sessions, only: %i[create destroy] 
  resources :users, only: %i[create index]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
