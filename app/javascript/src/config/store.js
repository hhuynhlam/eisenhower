import { connectRouter, routerMiddleware } from 'connected-react-router'
import Immutable, { fromJS } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import history from './history'
import reducer from './reducer'

const devToolsExtension = window.devToolsExtension &&
    window.devToolsExtension({ serialize: { immutable: Immutable } })

const enhancers = (devToolsExtension) ?
  compose(applyMiddleware(routerMiddleware(history)), devToolsExtension) :
  compose(applyMiddleware(routerMiddleware(history)))

const store = createStore(
  connectRouter(history)(reducer),
  fromJS({}),
  enhancers,
)

export default store
