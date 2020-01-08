import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from 'data/store'
import AppRouter from '../router'

export default function RouterProvider () {
  return <ConnectedRouter history={history}>
    <HashRouter history={history}>
      <AppRouter />
    </HashRouter>
  </ConnectedRouter>
}
