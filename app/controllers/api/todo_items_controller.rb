class Api::TodoItemsController < ApiController
  def index
    @todo_items = TodoItem.where(todo_list: todo_list)

    render 'index'
  end

  def show
    @todo_item = TodoItem.find(params[:id])

    render 'show'
  end

  def create
    @todo_item = TodoItem.create!(todo_item_params)

    render 'show'
  end

  def update
    @todo_item = TodoItem.find(params[:id])
    @todo_item.update!(todo_item_params)

    render 'show'
  end

  def destroy
    @todo_item = TodoItem.find(params[:id])
    @todo_item.destroy!
  end

  def complete
    @todo_item = TodoItem.find(params[:id])
    @todo_item.complete!(todo_item_params)

    render 'show'
  end

  def reopen
    @todo_item = TodoItem.find(params[:id])
    @todo_item.reopen!(todo_item_params)

    render 'show'
  end

  private

  def todo_item_params
    params
      .permit(:description, :important, :rank, :urgent)
      .merge(todo_list: todo_list)
  end

  # FIXME: Default to first TodoList until TodoLists CRUD is supported.
  def todo_list
    TodoList.find_by(user_id: current_user['sub'])
  end
end
