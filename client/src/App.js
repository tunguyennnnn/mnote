import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  HomePage,
  InstagramHelper,
  MyNotesPage,
  MediaUploader
} from './containers'

import {
  AuthenticationRoute
} from './components'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/media' component={MediaUploader} />
          <Route exact path='/instagram' component={InstagramHelper} />
          <Route exact path='/myprofile' component={HomePage} />
          <AuthenticationRoute exact path='/' component={MyNotesPage} />
        </Switch>
      </div>
    )
  }
}
