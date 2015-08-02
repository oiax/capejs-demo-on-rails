class Api::V2::TasksController < ApplicationController
  def index
    @tasks = Task.order(sort_order: :asc)
  end

  def create
    if Task.create(task_params)
      render json: { result: 'OK' }
    else
      render json: { result: 'NG' }
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update_attributes(task_params)
      render json: { result: 'OK' }
    else
      render json: { result: 'NG' }
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render json: { result: 'OK' }
  end

  def move_up
    task = Task.find(params[:id])
    task.move_up
    render json: { result: 'OK' }
  end

  def move_down
    task = Task.find(params[:id])
    task.move_down
    render json: { result: 'OK' }
  end

  private
  def task_params
    params.require(:task).permit(:title, :done)
  end
end
