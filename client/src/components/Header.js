import './header.scss'

import React from 'react'
import { Input, Menu } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'


class LargeHeader extends React.Component {
  render () {
    return (
      <Menu style={{padding: 5}}>
        <Menu.Item>
          
        </Menu.Item>
        <Menu.Item>
          <Input className='icon' icon='search' placeholder='Search...' />
        </Menu.Item>
        <Menu.Item>
          
        </Menu.Item>
      </Menu>
    )
  }
}

class SmallHeader extends React.Component {
  render () {
    return (
      <Menu style={{padding: 5}}>
        <Menu.Item>
          <Input className='icon' icon='search' placeholder='Search...' />
        </Menu.Item>
        <Menu.Item>
          
        </Menu.Item>
      </Menu>
    )
  }
}

export default class Header extends React.Component {
  render () {
    return (
      <div class='app-header'>
        <MediaQuery query="(min-device-width: 500px)">
          <LargeHeader />
        </MediaQuery>
        <MediaQuery query="(max-device-width: 500px">
          <SmallHeader />
        </MediaQuery>
      </div>
    )
  }
}