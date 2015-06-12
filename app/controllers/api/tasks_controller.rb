class Api::TasksController < ApplicationController
  def index
    @tasks = Task.order(sort_order: :asc)
  end

  def create
    if Task.create(task_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update_attributes(task_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render text: 'OK'
  end

  def move_up
    task = Task.find(params[:id])
    task.move_up
    render text: 'OK'
  end

  def move_down
    task = Task.find(params[:id])
    task.move_down
    render text: 'OK'
  end

  private
  def task_params
    params.require(:task).permit(:title, :done)
  end
end
