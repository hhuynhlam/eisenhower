import React from 'react'
import { DetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { Draggable } from 'react-beautiful-dnd'
import uuid from 'uuid/v1'
import constants from '../constants'
import * as Styled from './TodoColumn.styles'

const { COLUMN_SUBTITLE, COLUMN_TITLE, COLUMN_TYPE } = constants

const COLUMNS = [
  {
    key: 'description',
    name: 'Description',
    fieldName: 'description',
  },
]

const mockItems = [
  {
    description: 'Task 1',
  },
  {
    description: 'Task 2',
  },
  {
    description: 'Task 3',
  },
  {
    description: 'Task 4',
  },
]

function TodoTask(props) {
  const {
    item,
    itemIndex,
  } = props

  return (
    <Draggable draggableId={uuid()} index={itemIndex}>
      {provided => (
        <Styled.TaskItem
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.description}
        </Styled.TaskItem>
      )}
    </Draggable>
  )
}

function TodoColumn(props) {
  const {
    items = mockItems,
    type = COLUMN_TYPE.WONTDO,
  } = props

  return (
    <React.Fragment>
      <Styled.ColumnHeader type={type}>
        {COLUMN_TITLE[type]}
        <Styled.ColumnSubtitle>
          {COLUMN_SUBTITLE[type]}
        </Styled.ColumnSubtitle>
      </Styled.ColumnHeader>

      <Styled.ColumnContent>
        <Styled.ColumnInput label="New Task:" underlined />

        <DetailsList
          columns={COLUMNS}
          isHeaderVisible={false}
          items={items}
          onRenderRow={TodoTask}
          selectionMode={SelectionMode.none}
        />
      </Styled.ColumnContent>
    </React.Fragment>
  )
}

export default TodoColumn
