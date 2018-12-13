import './app.scss'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  HomePage,
  InstagramHelper,
  NotesPage,
  MediaUploader,
  NoterPage
} from './containers'

import {
  AuthenticationRoute
} from './components'

export default class App extends React.Component {
  render () {
    return (
      <div class='app-container'>
        <Switch>
          <Route exact path='/media' component={MediaUploader} />
          <Route exact path='/instagram' component={InstagramHelper} />
          <Route exact path='/myprofile' component={HomePage} />
          <AuthenticationRoute exact path='/noters/:id' component={NoterPage} />
          <Route exact path='/noters' component={() => <div>list of noters</div>} />
          <AuthenticationRoute exact path='/' component={NotesPage} />
        </Switch>
      </div>
    )
  }
}
