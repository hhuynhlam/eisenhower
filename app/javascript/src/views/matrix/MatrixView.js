import React, { useCallback } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Header } from 'header'
import { TodoColumn, TodoConstants } from 'todo_column'

function MatrixView() {
  const { COLUMN_TYPE } = TodoConstants
  const columns = [COLUMN_TYPE.DO, COLUMN_TYPE.SCHEDULE, COLUMN_TYPE.DELEGATE, COLUMN_TYPE.WONTDO]

  const onBeforeCapture = useCallback(() => {
  }, [])
  const onBeforeDragStart = useCallback(() => {
  }, [])
  const onDragStart = useCallback(() => {
  }, [])
  const onDragUpdate = useCallback(() => {
  }, [])
  const onDragEnd = useCallback((a, b, c) => {
    console.log('a', a)
    console.log('b', b)
    console.log('c', c)
  }, [])

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Header />

      <div className="row">
        {columns.map(type => (
          <Droppable key={type} droppableId={type}>
            {provided => (
              <MatrixView.Cell
                className="col-xs-12 col-sm-6"
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                <TodoColumn type={type} />
              </MatrixView.Cell>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

MatrixView.Cell = styled.div`
  height: calc((100vh - 6rem) / 2);
  min-height: 300px;
`

export default MatrixView
