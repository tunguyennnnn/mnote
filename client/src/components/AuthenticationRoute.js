import React from 'react'
import { Route } from 'react-router-dom'

import { AuthService } from '../services'

export default class AuthenticationRoute extends React.Component {
  state = {
    isLoggin: AuthService.isAuthenticated()
  }

  listenToAuthentication () {
    AuthService.lock.on('authenticated', (authResult) => {
      AuthService.lock.getUserInfo(authResult.accessToken, async (err, profile) => {
        try {
          if (err) {
            console.log(err)
            return
          }
          AuthService.saveToken(authResult)
          const { sub, email, ...metaData } = profile
          await AuthService.loginOrCreateUser({ sub, email, metaData })
          AuthService.lock.hide()
          this.setState({
            isLoggin: AuthService.isAuthenticated()
          })
        } catch (e) { 
          console.log(e)
        }
      })
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