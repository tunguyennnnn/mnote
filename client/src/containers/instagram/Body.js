import React from 'react'
import { Container, Grid, Image} from 'semantic-ui-react'

import SideList from './SideList'

export default class Body extends React.Component {
  render () {
    return (
      <Container>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <SideList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
