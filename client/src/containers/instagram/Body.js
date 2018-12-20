import React from 'react'
import { Container, Grid, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

import SideList from './SideList'
import RightSide from './RightSide'

class Body extends React.Component {
  state = {
    active: null,
    loading: false
  }

  setItem = (item) => {
    this.setState({ active: item })
  }

  deleteInstagramItem = async ({ id }) => {
    console.log(id)
    try {
      await this.props.deleteInstagramItem({
        variables: { id },
        update: (proxy, response) => {
          const data = proxy.readQuery({ query: instagramItemsQuery, variables: {} })
          data.instagramItems.edges = data.instagramItems.edges.filter(edge => edge.node.id !== id)
          proxy.writeQuery({ query: instagramItemsQuery, data })
          this.setState({ active: null })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  createInstagramItem = async ({ name, url, description }) => {
    try {
      this.setState({...this.state, loading: true})
      const response = await this.props.createInstagramItem({
        variables: { name, url, description },
        update: (proxy, { data: { createInstagramItem } }) => {
          const data = proxy.readQuery({ query: instagramItemsQuery, variables: {} })
          data.instagramItems.edges = [
            { cursor: createInstagramItem.createdAt, node: createInstagramItem, __typename: "InstagramItemEdge" },
            ...data.instagramItems.edges
          ]
          proxy.writeQuery({ query: instagramItemsQuery, data })
        }
      })
      this.setState({
        ...this.state,
        loading: false,
        active: createInstagramItem
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    console.log(this.props)
    const { data } = this.props
    if (data.loading) return null
    const { instagramItems } = data
    const { active } = this.state
    return (
      <Container>
        {
          this.state.loading &&
          <Dimmer active inverted>
            <Loader size='small'>Loading</Loader>
          </Dimmer>
        }
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <SideList items={instagramItems.edges} setItem={this.setItem}
                deleteInstagramItem={this.deleteInstagramItem}
                createInstagramItem={this.createInstagramItem}
              />
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
          description
        }
      }
    }
  }
`

const newInstagramItemMutation = gql`
  mutation createInstagramItem($url: String!, $name: String!, $description: String!) {
    createInstagramItem (url: $url, name: $name, description: $description) {
      id
      url
      name
      description
      createdAt
    }
  }
`

const destroyInstagramItemMutation = gql`
  mutation deleteInstagramItem ($id: ID!) {
    deleteInstagramItem (id: $id)
  }
`

export default compose(
  graphql(instagramItemsQuery, {
    options (props) {
      return {
        variables: {}
      }
    }
  }),
  graphql(newInstagramItemMutation, { name: 'createInstagramItem' }),
  graphql(destroyInstagramItemMutation, { name: 'deleteInstagramItem' })
)(Body)
