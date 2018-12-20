import React from 'react'
import { Route } from 'react-router-dom'
import authenticate from './authenticate'
import { AuthService } from '../services'

@authenticate
export default class AuthenticationRoute extends React.Component {
 

  componentDidMount () {
    if (!this.state.isLoggin) {
      AuthService.lock.show()
    }
  }

  render () {
    if (!this.props.isLoggedin) return <div>Logging in...</div>
    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={(props) => <Component {...props} />} />
    )
  }
}