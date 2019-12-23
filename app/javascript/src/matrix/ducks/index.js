import { fromJS } from 'immutable'
import { LexoRank } from 'lexorank'
import getColumnTypeFilters from '../utils/getColumnTypeFilters'
import sortColumnByRank from '../utils/sortColumnByRank'

const NAMESPACE = 'matrix'

/**
 * Selectors -----------------------------------------
 */
function selectItems(state) {
  return state.getIn([NAMESPACE, 'items']).toJS()
}

function selectSortedItems(type) {
  return (state) => {
    const items = state.getIn([NAMESPACE, 'items']).toJS()

    return sortColumnByRank(type, items)
  }
}

/**
 * Actions --------------------------------------------
 */
const ADD_ITEM = `${NAMESPACE}.ADD_ITEM`
const MOVE_ITEM = `${NAMESPACE}.MOVE_ITEM`
const REMOVE_ITEM = `${NAMESPACE}.REMOVE_ITEM`
const UPDATE_ITEM = `${NAMESPACE}.UPDATE_ITEM`

function addItem(payload) {
  if (!payload.id) throw new Error('id is required')

  return {
    type: ADD_ITEM,
    payload,
  }
}
function moveItem(draggableId, source, destination) {
  if (!draggableId) throw new Error('draggableId is required')
  if (!destination) throw new Error('destination is required')
  if (!source) throw new Error('source is required')

  return {
    type: MOVE_ITEM,
    payload: {
      draggableId,
      destination,
      source,
    },
  }
}
function removeItem(id) {
  if (!id) throw new Error('id is required')

  return {
    type: REMOVE_ITEM,
    payload: { id },
  }
}
function updateItem(payload) {
  if (!payload.id) throw new Error('id is required')
  if (!payload.description) throw new Error('description is required')
  if (!payload.type) throw new Error('type is required')

  return {
    type: UPDATE_ITEM,
    payload,
  }
}

/**
 * Reducer --------------------------------------------
 */
const INITIAL_STATE = fromJS({
  items: {},
  minRank: LexoRank.middle().value,
})

/**
 * Root
 */
function reassignItemReducer(state, action) {
  const { destination, draggableId } = action.payload

  return state.updateIn(['items', draggableId], item => (fromJS({
    ...item.toJS(),
    ...getColumnTypeFilters(destination.droppableId),
  })))
}
function removeItemReducer(state, action) {
  return state.deleteIn(['items', action.payload.id])
}
function updateItemReducer(state, action) {
  const { id, type, ...values } = action.payload

  const item = {
    ...values,
    ...getColumnTypeFilters(type),
  }

  return state.setIn(['items', id], fromJS(item))
}
function updateMinRankReducer(state, action) {
  return state.set('minRank', action.payload.rank)
}


/**
 * Second-Level
 */
function addItemReducer(state, action) {
  const minRank = state.get('minRank')
  const rank = LexoRank.parse(minRank).genPrev().value

  const newState = updateMinRankReducer(state, { payload: { rank } })

  const payload = {
    ...action.payload,
    rank,
  }

  return updateItemReducer(newState, { payload })
}
function reorderItemReducer(state, action) {
  const { destination, draggableId } = action.payload
  const items = state.getIn('items')
  const column = sortColumnByRank(destination.droppableId, items)

  // move to first rank
  if (destination.index === 0) {
    // column is empty
    if (column.length === 0) {
      const minRank = state.get('minRank')
      const rank = LexoRank.parse(minRank).genPrev().value

      const newState = updateMinRankReducer(state, { payload: { rank } })

      return newState.setIn(['items', draggableId, 'rank'], rank)
    }

    // column is not empty
    const nextRank = LexoRank.parse(column[destination.index + 1].rank)

    return state.setIn(['items', draggableId, 'rank'], nextRank.genPrev().value)
  }

  // move to last rank
  if (destination.index === column.length - 1) {
    const prevRank = LexoRank.parse(column[destination.index - 1].rank)

    return state.setIn(['items', draggableId, 'rank'], prevRank.genNext().value)
  }

  // move to somewhere in between
  const prevRank = LexoRank.parse(column[destination.index - 1].rank)
  const nextRank = LexoRank.parse(column[destination.index + 1].rank)

  return state.setIn(['items', draggableId, 'rank'], prevRank.between(nextRank).value)
}

/**
 * Third-Level
 */

function moveItemReducer(state, action) {
  const { destination, source } = action.payload

  if (destination.droppableId !== source.droppableId) {
    return reassignItemReducer(state, action)
  }

  return reorderItemReducer(state, action)
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ITEM:
      return addItemReducer(state, action)
    case MOVE_ITEM:
      return moveItemReducer(state, action)
    case REMOVE_ITEM:
      return removeItemReducer(state, action)
    case UPDATE_ITEM:
      return updateItemReducer(state, action)
    default:
      return state
  }
}

export default {
  addItem,
  moveItem,
  removeItem,
  updateItem,

  reducer,

  selectItems,
  selectSortedItems,
}
