import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  HomePage,
  InstagramHelper,
  MyNotesPage,
  MediaUploader
} from './containers'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/media' component={MediaUploader} />
          <Route exact path='/instagram' component={InstagramHelper} />
          <Route exact path='/mynotes' component={MyNotesPage} />
          <Route exact path='/' component={HomePage} />
        </Switch>
      </div>
    )
  }
}
