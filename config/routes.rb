Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resource :session, only: [ :show, :create, :destroy ]
    resources :tasks, except: [ :show, :new, :edit ] do
      patch :move_up, :move_down, on: :member
    end
  end
end
