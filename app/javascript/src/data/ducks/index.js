import produce from 'immer'
import { keyBy, mapValues, pipe, set } from 'lodash/fp'

const NAMESPACE = 'data'

/**
 * Actions --------------------------------------------
 */
const ITEMS_FETCHED = `${NAMESPACE}.ITEMS_FETCHED`
const ITEMS_FETCHED_FAIL = `${NAMESPACE}.ITEMS_FETCHED_FAIL`
const ITEMS_FETCHED_SUCCESS = `${NAMESPACE}.ITEMS_FETCHED_SUCCESS`

function fetchItems() {
  return {
    type: ITEMS_FETCHED,
    payload: {
      request: {
        method: 'GET',
        url: '/todo_items',
      },
    },
  }
}

/**
 * Reducer --------------------------------------------
 */
const INITIAL_STATE = {
  items: {
    data: null,
    error: null,
    loading: false,
  },
}

function fetchedItemsReducer(state) {
  return set(['items', 'loading'], true)(state)
}
function fetchedItemsFailReducer(state, action) {
  const { message } = action.error

  return pipe(
    set(['items', 'error'], message),
    set(['items', 'loading'], false),
  )(state)
}
function fetchedItemsSuccessReducer(state, action) {
  const { data: { data } } = action.payload

  const serialized = pipe(
    keyBy('id'),
    mapValues(datum => datum.attributes),
  )(data)

  return pipe(
    set(['items', 'data'], serialized),
    set(['items', 'loading'], false),
  )(state)
}

function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ITEMS_FETCHED:
        return fetchedItemsReducer(draft, action)
      case ITEMS_FETCHED_FAIL:
        return fetchedItemsFailReducer(draft, action)
      case ITEMS_FETCHED_SUCCESS:
        return fetchedItemsSuccessReducer(draft, action)
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

export default {
  NAMESPACE,

  ITEMS_FETCHED_SUCCESS,

  fetchItems,

  reducer,

  selectItems,
}
