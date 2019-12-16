import React from 'react'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Route, Switch } from 'react-router-dom'
import history from '../config/history'
import MatrixView from './matrix/MatrixView'

function Views() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={MatrixView} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Views
