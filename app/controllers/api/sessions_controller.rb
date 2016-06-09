class Api::SessionsController < ApplicationController
  def show
    if current_user
      render text: 'OK'
    else
      render text: 'NA'
    end
  end

  def create
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render text: 'OK'
    else
      render text: 'FAILED'
    end
  end

  def destroy
    session.delete(:user_id)
    render text: 'OK'
  end
end
