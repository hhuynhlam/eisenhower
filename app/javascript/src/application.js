import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import 'flexboxgrid/dist/flexboxgrid.css'
import store from './config/store'
import Views from './views'
import './styles/application.css'

function App() {
  return (
    <Provider store={store}>
      <Views />
    </Provider>
  )
}

export default hot(module)(App)
