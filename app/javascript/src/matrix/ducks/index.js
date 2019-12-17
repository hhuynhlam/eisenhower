import { fromJS } from 'immutable'
import constants from '../constants'

const { COLUMN_TYPE } = constants
const NAMESPACE = 'matrix'

/**
 * Actions --------------------------------------------
 */
const REMOVE_ITEM = `${NAMESPACE}.REMOVE_ITEM`
const UPDATE_ITEM = `${NAMESPACE}.UPDATE_ITEM`

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
})

function removeItemReducer(state, action) {
  return state.deleteIn(['items', action.payload.id])
}
function updateItemReducer(state, action) {
  const { id, type, ...values } = action.payload

  const item = { ...values }

  switch (type) {
    case COLUMN_TYPE.DO:
      item.important = true
      item.urgent = true
      break
    case COLUMN_TYPE.SCHEDULE:
      item.important = true
      item.urgent = false
      break
    case COLUMN_TYPE.DELEGATE:
      item.important = false
      item.urgent = true
      break
    default:
      item.important = false
      item.urgent = false
  }

  return state.setIn(['items', id], item)
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REMOVE_ITEM:
      return removeItemReducer(state, action)
    case UPDATE_ITEM:
      return updateItemReducer(state, action)
    default:
      return state
  }
}

/**
 * Selectors -----------------------------------------
 */
function selectItems(state) {
  return state.getIn([NAMESPACE, 'items']).toJS()
}

export default {
  removeItem,
  updateItem,

  reducer,

  selectItems,
}
