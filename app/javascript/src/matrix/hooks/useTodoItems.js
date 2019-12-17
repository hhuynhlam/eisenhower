import { filter, map, pipe } from 'lodash/fp'
import { useSelector } from 'react-redux'
import constants from '../constants'
import ducks from '../ducks'

const _map = map.convert({ cap: false })

const { COLUMN_TYPE } = constants

function useTodoItems(type) {
  const filters = {}
  const items = useSelector(ducks.selectItems)

  switch (type) {
    case COLUMN_TYPE.DO:
      filters.important = true
      filters.urgent = true
      break
    case COLUMN_TYPE.SCHEDULE:
      filters.important = true
      filters.urgent = false
      break
    case COLUMN_TYPE.DELEGATE:
      filters.important = false
      filters.urgent = true
      break
    default:
      filters.important = false
      filters.urgent = false
  }

  return pipe([
    _map((val, key) => ({ id: key, ...val })),
    filter(filters),
  ])(items)
}

export default useTodoItems
