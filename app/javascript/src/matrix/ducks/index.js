import produce from 'immer'
import { LexoRank } from 'lexorank'
import { keyBy, mapValues, pipe, set, unset, update } from 'lodash/fp'
import { ducks as dataDucks } from '../../data'
import getColumnTypeFilters from '../utils/getColumnTypeFilters'
import sortColumnByRank from '../utils/sortColumnByRank'

const NAMESPACE = 'matrix'

/**
 * Actions --------------------------------------------
 */
const ITEM_ADDED = `${NAMESPACE}.ITEM_ADDED`
const ITEM_MOVED = `${NAMESPACE}.ITEM_MOVED`
const ITEM_REMOVED = `${NAMESPACE}.ITEM_REMOVED`
const ITEM_UPDATED = `${NAMESPACE}.ITEM_UPDATED`

function addItem(payload) {
  if (!payload.id) throw new Error('id is required')

  return {
    type: ITEM_ADDED,
    payload,
  }
}
function moveItem(draggableId, source, destination) {
  if (!draggableId) throw new Error('draggableId is required')
  if (!destination) throw new Error('destination is required')
  if (!source) throw new Error('source is required')

  return {
    type: ITEM_MOVED,
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
    type: ITEM_REMOVED,
    payload: { id },
  }
}
function updateItem(payload) {
  if (!payload.id) throw new Error('id is required')
  if (!payload.description) throw new Error('description is required')
  if (!payload.type) throw new Error('type is required')

  return {
    type: ITEM_UPDATED,
    payload,
  }
}

/**
 * Reducer --------------------------------------------
 */
const INITIAL_STATE = {
  items: {},
  minRank: LexoRank.middle().value,
}

/**
 * First-Level
 */
function fetchedItemsSuccessReducer(state, action) {
  const { data: { data } } = action.payload

  const serialized = pipe(
    keyBy('id'),
    mapValues(datum => datum.attributes),
  )(data)

  return pipe(
    set(['items'], serialized),
  )(state)
}
function reassignItemReducer(state, action) {
  const { destination, draggableId } = action.payload

  return update(['items', draggableId], item => ({
    ...item,
    ...getColumnTypeFilters(destination.droppableId),
  }))(state)
}
function removeItemReducer(state, action) {
  return unset(['items', action.payload.id])(state)
}
function updateItemReducer(state, action) {
  const { id, type, ...values } = action.payload

  const item = {
    ...values,
    ...getColumnTypeFilters(type),
  }

  return set(['items', id], item)(state)
}
function updateMinRankReducer(state, action) {
  return set(['minRank'], action.payload.rank)(state)
}


/**
 * Second-Level
 */
function addItemReducer(state, action) {
  const { minRank } = state
  const rank = LexoRank.parse(minRank).genPrev().value

  const newState = updateMinRankReducer(state, { payload: { rank } })

  const payload = {
    ...action.payload,
    rank,
  }

  return updateItemReducer(newState, { payload })
}
function reorderItemReducer(state, action) {
  const { items } = state
  const { destination, draggableId } = action.payload
  const column = sortColumnByRank(destination.droppableId, items)

  // move to first rank
  if (destination.index === 0) {
    // column is empty
    if (column.length === 0) {
      const { minRank } = state
      const rank = LexoRank.parse(minRank).genPrev().value

      const newState = updateMinRankReducer(state, { payload: { rank } })

      return set(['items', draggableId, 'rank'], rank)(newState)
    }

    // column is not empty
    const nextRank = LexoRank.parse(column[destination.index + 1].rank)

    return set(['items', draggableId, 'rank'], nextRank.genPrev().value)(state)
  }

  // move to last rank
  if (destination.index === column.length - 1) {
    const prevRank = LexoRank.parse(column[destination.index - 1].rank)

    return set(['items', draggableId, 'rank'], prevRank.genNext().value)(state)
  }

  // move to somewhere in between
  const prevRank = LexoRank.parse(column[destination.index - 1].rank)
  const nextRank = LexoRank.parse(column[destination.index + 1].rank)

  return set(['items', draggableId, 'rank'], prevRank.between(nextRank).value)(state)
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
  return produce(state, (draft) => {
    switch (action.type) {
      case dataDucks.ITEMS_FETCHED_SUCCESS:
        return fetchedItemsSuccessReducer(draft, action)
      case ITEM_ADDED:
        return addItemReducer(draft, action)
      case ITEM_MOVED:
        return moveItemReducer(draft, action)
      case ITEM_REMOVED:
        return removeItemReducer(draft, action)
      case ITEM_UPDATED:
        return updateItemReducer(draft, action)
      default:
        return draft
    }
  })
}

/**
 * Selectors -----------------------------------------
 */
function selectItems(state) {
  return state[NAMESPACE].items
}

function selectSortedItems(type) {
  return (state) => {
    const { items } = state[NAMESPACE]

    return sortColumnByRank(type, items)
  }
}

export default {
  NAMESPACE,

  addItem,
  moveItem,
  removeItem,
  updateItem,

  reducer,

  selectItems,
  selectSortedItems,
}
