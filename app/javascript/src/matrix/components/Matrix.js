import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import constants from '../constants'
import ducks from '../ducks'
import TodoColumn from './TodoColumn'
import { Cell, Row } from './Matrix.styles'

const { COLUMN_TYPE } = constants

const types = [
  [COLUMN_TYPE.DO, COLUMN_TYPE.SCHEDULE],
  [COLUMN_TYPE.DELEGATE, COLUMN_TYPE.WONTDO],
]

function Matrix() {
  const dispatch = useDispatch()

  function onDragEnd(reason) {
    const { destination, draggableId, source } = reason

    dispatch(ducks.moveItem(draggableId, source, destination))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {types.map((row, index) => (
        <Row key={`row${index}`} className="row">
          {row.map(column => (
            <Droppable key={column} droppableId={column}>
              {provided => (
                <Cell
                  className="col-xs-12 col-sm-6"
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TodoColumn type={column} />
                </Cell>
              )}
            </Droppable>
          ))}
        </Row>
      ))}
    </DragDropContext>
  )
}

export default Matrix
