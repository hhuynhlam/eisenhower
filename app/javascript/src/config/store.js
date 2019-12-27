import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import history from './history'
import createReducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(applyMiddleware(routerMiddleware(history)))

const store = createStore(
  createReducer(history),
  {},
  enhancers,
)

export default store
