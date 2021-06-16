Rails.application.routes.draw do
  resources :questions, except: %i[new edit]
  resources :quizzes, expect: %i[new edit]
  resource :sessions, only: %i[create destroy] 
  resources :users, only: %i[create index]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
