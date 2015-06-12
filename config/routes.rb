Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resources :tasks, except: [ :show, :new, :edit ] do
      patch :move_up, :move_down, on: :member
    end
  end
end
