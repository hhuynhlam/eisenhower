json.data do
  json.partial! 'api/todo_items/todo_item', locals: { todo_item: @todo_item }
end
