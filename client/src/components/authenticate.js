import React from 'react'
import { AuthService } from '../services'

export default function authenticate (Component) {
  return class AuthenticationWrapper extends React.Component {
    state = {
      isLoggedin: AuthService.isAuthenticated()
    }
  
    componentWillMount () {
      this.listenToAuthentication()
    }
    
    listenToAuthentication () {
      AuthService.lock.on('authenticated', async (authResult) => {
        try {
          await AuthService.saveToken(authResult)
          AuthService.lock.hide()
          this.setState({
            isLoggedin: AuthService.isAuthenticated()
          })
        } catch (e) {
          console.log(e)
        }
      })
    }
    render () {
      return (
        <Component isLoggedin={this.state.isLoggedin} {...this.props} />
      )
    }
  }
}