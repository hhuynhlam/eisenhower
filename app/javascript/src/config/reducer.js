import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux-immutable'
import { ducks as matrixDucks } from 'matrix'

export default function createReducer(history) {
  return combineReducers({
    matrix: matrixDucks.reducer,
    router: connectRouter(history),
  })
}
