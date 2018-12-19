import './header.scss'

import React from 'react'
import { Input, Menu, Label } from 'semantic-ui-react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import { AuthService } from '../services'

@withRouter
export default class Header extends React.Component {
  renderMyProfile () {
    if (!AuthService.isAuthenticated()) return null
    const { pathname } = this.props.location

    const { userId, picture } = AuthService.userProfile()

    return (
      <Menu.Item 
        active={/^\/noters\/\d+$/.test(pathname) &&  userId === /\d+$/.exec(pathname)[0]}
      >
        <Link to={`/noters/${userId}`}>Me</Link>
      </Menu.Item>
    )
  }

  renderActions () {
    if (!AuthService.isAuthenticated()) {
      return (
        <Menu.Item onClick={() => AuthService.lock.show()}>Login</Menu.Item>
      )
    }
    return <Menu.Item onClick={() => {
        AuthService.logout()
        window.location.reload()
      }
    }>
      Logout
    </Menu.Item>
  }
  
  render () {
    const { pathname } = this.props.location
    return (
      <div class='app-header'>
        <Menu pointing secondary style={{padding: '0 2vw 0 2vw'}}>
          <Menu.Menu position='left'>
            <Menu.Item active={pathname === '/'}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            {this.renderMyProfile()}
          </Menu.Menu>
          <MediaQuery query="(min-device-width: 500px)">
            <Menu.Item position='center'>
              <Input className='icon' icon='search' placeholder='Search...' />
            </Menu.Item>
          </MediaQuery>
          <Menu.Menu position='right'>
            {this.renderActions()}
          </Menu.Menu>
        </Menu>
        <MediaQuery query="(max-device-width: 500px">
          <Input className='icon' icon='search' placeholder='Search...' />
        </MediaQuery>
      </div>
    )
  }
}