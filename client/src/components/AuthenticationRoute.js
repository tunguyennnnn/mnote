import React from 'react'
import { Route } from 'react-router-dom'

import { AuthService } from '../services'

export default class AuthenticationRoute extends React.Component {
  state = {
    isLoggin: AuthService.isAuthenticated()
  }

  listenToAuthentication () {
    AuthService.lock.on('authenticated', async (authResult) => {
      try {
        await AuthService.saveToken(authResult)
        AuthService.lock.hide()
        this.setState({
          isLoggin: AuthService.isAuthenticated()
        })
      } catch (e) {
        console.log(e)
      }
    })
  }

  // LIFE CYCLES
  componentWillMount () {
    this.listenToAuthentication()
  }

  componentDidMount () {
    if (!this.state.isLoggin) {
      AuthService.lock.show()
    }
  }

  render () {
    if (!this.state.isLoggin) return <div>Logging in...</div>
    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={(props) => <Component {...props} />} />
    )
  }
}