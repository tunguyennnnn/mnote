import React from 'react'
import { Container, Grid, Image} from 'semantic-ui-react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

import SideList from './SideList'
import RightSide from './RightSide'

class Body extends React.Component {
  state = {
    active: null
  }

  setItem = (item) => {
    this.setState({ active: item })
  }

  render () {
    console.log(this.props)
    const { data } = this.props
    if (data.loading) return null
    const { instagramItems } = data
    const { active } = this.state
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <SideList items={instagramItems.edges} setItem={this.setItem} />
            </Grid.Column>
            <Grid.Column width={10}>
              <RightSide activeItem={active} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const instagramItemsQuery = gql`
  query instagramItems ($cursor: String, $limit: Int) {
    instagramItems(cursor: $cursor, limit: $limit) {
      pageInfo {
      hasNextPage
      }
      edges {
      	cursor
        node {
          id
          url
          name
        }
      }
    }
  }
`

export default compose(
  graphql(instagramItemsQuery, {
    options (props) {
      return {
        variables: {
          limit: 10
        }
      }
    }
  })
)(Body)
