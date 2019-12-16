import { routerMiddleware } from 'connected-react-router/immutable'
import Immutable, { fromJS } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import history from './history'
import createReducer from './reducer'

const devToolsExtension = window.devToolsExtension &&
    window.devToolsExtension({ serialize: { immutable: Immutable } })

const enhancers = (devToolsExtension) ?
  compose(applyMiddleware(routerMiddleware(history)), devToolsExtension) :
  compose(applyMiddleware(routerMiddleware(history)))

const store = createStore(
  createReducer(history),
  fromJS({}),
  enhancers,
)

export default store
