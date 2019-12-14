import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import history from '../config/history'

function Views() {
  return <ConnectedRouter history={history} />
}

export default Views
