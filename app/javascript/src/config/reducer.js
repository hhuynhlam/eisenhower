import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { ducks as dataDucks } from 'data'
import { ducks as matrixDucks } from 'matrix'

export default function createReducer(history) {
  return combineReducers({
    router: connectRouter(history),

    [dataDucks.NAMESPACE]: dataDucks.reducer,
    [matrixDucks.NAMESPACE]: matrixDucks.reducer,
  })
}
