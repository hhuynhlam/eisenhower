import React, { useState } from 'react'
import { IconButton } from 'office-ui-fabric-react'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import ducks from '../ducks'
import getMenuActions from '../utils/getMenuActions'
import * as Styled from '../components/TodoColumn.styles'

function useTextFieldPrefix(props) {
  return () => <FontIcon iconName="GripperBarHorizontal" {...props} />
}

function useTextFieldSuffix(props) {
  const {
    menu,
  } = props

  return () => (
    <React.Fragment>
      <IconButton
        menuIconProps={{ iconName: 'More' }}
        menuProps={menu}
        title="More Options"
      />
      <IconButton
        iconProps={{ iconName: 'CheckMark' }}
        title="Complete"
      />
    </React.Fragment>
  )
}

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

    const menu = {
      items: [
        ...getMenuActions(dispatch)(type, item.id),
        {
          key: 'delete',
          onClick: handleRemove(item.id),
          text: 'Delete',
        },
      ],
    }

    return (
      <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
        {provided => (
          <Styled.TaskItem
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Styled.TextField
              defaultValue={item.description}
              onChange={handleChange(item.id)}
              onRenderPrefix={useTextFieldPrefix({ ...provided.dragHandleProps })}
              onRenderSuffix={useTextFieldSuffix({ menu })}
              underlined
              value={textValue}
            />
          </Styled.TaskItem>
        )}
      </Draggable>
    )
  }
}

export default useTodoTask
