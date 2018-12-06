import React from 'react'
import { Route } from 'react-router-dom'

import { AuthService } from '../services'

export default class AuthenticationRoute extends React.Component {
  render () {
    if (!AuthService.isAuthenticated()) {
      AuthService.lock.show()
      return (
        <div>
          Something
        </div>
      )
    }

    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={(props) => <Component {...props} />} />
    )
  }
}