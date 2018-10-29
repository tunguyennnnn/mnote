import React from 'react'
import { Container } from 'semantic-ui-react'
import { Header } from './myresume'

export default class HomePage extends React.Component {
  render () {
    return (
      <div>
        <Container>
          <Header />
        </Container>
      </div>
    )
  }
}
