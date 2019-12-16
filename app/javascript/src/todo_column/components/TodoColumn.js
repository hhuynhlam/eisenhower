import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import TodoConstants from '../constants'

const { COLUMN_TITLE, COLUMN_TYPE } = TodoConstants

const COLOR_MAP = {
  [COLUMN_TYPE.DO]: '#FF3535',
  [COLUMN_TYPE.SCHEDULE]: '#35B0FF',
  [COLUMN_TYPE.DELEGATE]: '#FF7B35',
  [COLUMN_TYPE.WONTDO]: '#A2A2A2',
}

function TodoColumn(props) {
  const {
    // items = [],
    type = COLUMN_TYPE.WONTDO,
  } = props

  return (
    <React.Fragment>
      <TodoColumn.Header type={type}>
        {COLUMN_TITLE[type]}
      </TodoColumn.Header>

      <Draggable draggableId={type} index={0}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h4>My draggable</h4>
          </div>
        )}
      </Draggable>;
    </React.Fragment>
  )
}

TodoColumn.Header = styled.div`
  align-items: center;
  background-color: ${({ type }) => (COLOR_MAP[type])};
  color: #FFFFFF;
  display: flex;
  font-weight: 500;
  height: 3rem;
  padding: 0 32px;
`

export default TodoColumn
