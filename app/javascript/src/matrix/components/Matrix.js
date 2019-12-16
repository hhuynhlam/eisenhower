import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import constants from '../constants'
import TodoColumn from './TodoColumn'
import { Cell, Row } from './Matrix.styles'

function Matrix(props) {
  const {
    onDragEnd,
  } = props

  const { COLUMN_TYPE } = constants

  const types = [
    [COLUMN_TYPE.DO, COLUMN_TYPE.SCHEDULE],
    [COLUMN_TYPE.DELEGATE, COLUMN_TYPE.WONTDO],
  ]

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
