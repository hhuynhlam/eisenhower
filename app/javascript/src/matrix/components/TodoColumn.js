import React, { useRef, useState } from 'react'
import useEventListener from '@use-it/event-listener'
import { DetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import constants from '../constants'
import * as Styled from './TodoColumn.styles'
import ducks from '../ducks'
import useTodoTask from '../hooks/useTodoTask'

const { COLUMN_SUBTITLE, COLUMN_TITLE, COLUMN_TYPE } = constants

const COLUMNS = [
  {
    key: 'description',
    name: 'Description',
    fieldName: 'description',
  },
]

function TodoColumn(props) {
  const {
    type = COLUMN_TYPE.WONTDO,
  } = props

  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [newTask, setNewTask] = useState('')
  const items = useSelector(ducks.selectSortedItems(type))

  function handleAdd(value) {
    const payload = {
      id: uuid(),
      description: value,
      type,
    }

    dispatch(ducks.addItem(payload))

    setNewTask('')
  }

  function handleChange(event, value) {
    setNewTask(value)
  }

  useEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !!newTask) {
      handleAdd(newTask)
    }
  }, inputRef.current)

  return (
    <div ref={inputRef}>
      <Styled.ColumnHeader type={type}>
        {COLUMN_TITLE[type]}
        <Styled.ColumnSubtitle>
          {COLUMN_SUBTITLE[type]}
        </Styled.ColumnSubtitle>
      </Styled.ColumnHeader>

      <Styled.ColumnContent>
        <Styled.ColumnInput
          iconProps={{ iconName: 'Add' }}
          onChange={handleChange}
          underlined
          value={newTask}
        />
        <DetailsList
          compact
          columns={COLUMNS}
          isHeaderVisible={false}
          items={items}
          onRenderRow={useTodoTask(type)}
          selectionMode={SelectionMode.none}
        />
      </Styled.ColumnContent>
    </div>
  )
}

export default TodoColumn
