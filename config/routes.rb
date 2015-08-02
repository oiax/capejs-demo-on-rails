Rails.application.routes.draw do
  root 'top#index'
  get 'ver2' => 'top#ver2'

  namespace :api do
    resources :tasks, except: [ :show, :new, :edit ] do
      patch :move_up, :move_down, on: :member
    end
    namespace :v2 do
      resources :tasks, except: [ :show, :new, :edit ] do
        patch :move_up, :move_down, on: :member
      end
    end
  end
end
