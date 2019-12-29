import React from 'react'
import { initializeIcons } from '@uifabric/icons'
import { loadTheme } from 'office-ui-fabric-react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import 'flexboxgrid/dist/flexboxgrid.css'
import store from './config/store'
import theme from './config/theme'
import Views from './views'
import './styles/application.css'

function App() {
  loadTheme(theme)
  initializeIcons()

  return (
    <Provider store={store}>
      <Views />
    </Provider>
  )
}

export default hot(module)(App)
