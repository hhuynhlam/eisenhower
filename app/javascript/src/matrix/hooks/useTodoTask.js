import React, { useState } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import ducks from '../ducks'
import * as Styled from '../components/TodoColumn.styles'

function useTodoTask(type) {
  const dispatch = useDispatch()
  const [textValue, setTextValue] = useState()

  function handleChange(id) {
    return (event, value) => {
      const payload = { id, description: value, type }

      setTextValue(textValue)
      dispatch(ducks.updateItem(payload))
    }
  }

  function handleRemove(id) {
    return () => dispatch(ducks.removeItem(id))
  }

  return function Task(props) {
    const {
      item,
      itemIndex,
    } = props

    return (
      <Draggable draggableId={item.description} index={itemIndex}>
        {provided => (
          <Styled.TaskItem
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TextField
              defaultValue={item.description}
              onChange={handleChange(item.id)}
              underlined
              value={textValue}
            />
            <button onClick={handleRemove(item.id)}>Remove</button>
          </Styled.TaskItem>
        )}
      </Draggable>
    )
  }
}

export default useTodoTask
