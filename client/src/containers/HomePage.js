import './myresume/MyResume.scss'
import React from 'react'

import { Container } from 'semantic-ui-react'
import { Header, Navigation, Body } from './myresume'

export default class HomePage extends React.Component {
  render () {
    return (
      <div class='mypage-container'>
        <Container>
          <Header />
          <Navigation />
          <Body />
        </Container>
      </div>
    )
  }
}
