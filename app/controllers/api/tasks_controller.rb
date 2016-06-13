class Api::TasksController < ApplicationController
  before_action :authorize

  def index
    @tasks = current_user.tasks.order(sort_order: :asc)
  end

  def create
    if current_user.tasks.create(task_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    if task.update_attributes(task_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def destroy
    task = current_user.tasks.find(params[:id])
    task.destroy
    render text: 'OK'
  end

  def move_up
    task = current_user.tasks.find(params[:id])
    task.move_up
    render text: 'OK'
  end

  def move_down
    task = current_user.tasks.find(params[:id])
    task.move_down
    render text: 'OK'
  end

  private
  def authorize
    render text: 'Unauthorized', status: :unauthorized unless current_user
  end

  def task_params
    params.require(:task).permit(:title, :done)
  end
end
