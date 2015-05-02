Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resources :items, except: [ :show, :new, :edit ]
  end
end
