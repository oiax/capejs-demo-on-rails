class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private
  def current_user
    return @current_user unless @current_user.nil?
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    else
      @current_user = false
    end
    @current_user
  end
end
