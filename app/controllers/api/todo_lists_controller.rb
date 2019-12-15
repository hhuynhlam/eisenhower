class Api::TodoListsController < ApiController
  def index
    @todo_lists = TodoList.all
  end

  def show
    @todo_list = TodoList.first
  end
end
