json.type 'todo_item'

json.id todo_item.id.to_s

json.attributes do
  json.description todo_item.description
  json.important todo_item.important
  json.state todo_item.state
  json.urgent todo_item.urgent
end
