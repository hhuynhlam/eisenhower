import axios from 'axios'
import { routerMiddleware } from 'connected-react-router'
import Cookies from 'js-cookie'
import { applyMiddleware, compose, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import history from './history'
import createReducer from './reducer'

const api = axios.create({
  baseURL: '/api',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${Cookies.get('jwt')}`,
  },
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(applyMiddleware(
  routerMiddleware(history),
  axiosMiddleware(api),
))

const store = createStore(
  createReducer(history),
  {},
  enhancers,
)

export default store
