import { fromJS } from 'immutable'

const NAMESPACE = 'matrix'

/**
 * Actions --------------------------------------------
 */
const ADD_ITEM = `${NAMESPACE}.ADD_ITEM`
const addItem = payload => ({ type: ADD_ITEM, payload })

/**
 * Reducer --------------------------------------------
 */
const INITIAL_STATE = fromJS({
  items: [],
})

function addItemReducer(state, action) {
  return state.get('items').push(action.payload)
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ITEM:
      return addItemReducer(state, action)
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
  addItem,

  reducer,

  selectItems,
}
