import React from 'react'
import { List, Header, Label } from 'semantic-ui-react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

import InfoItem from './InfoItem'

class InfoList extends React.Component {
  render () {
    const { data } = this.props
    if (data.loading || data.error) return null
    const { instagramItem } = data
    const { id, name, url, infoConnection } = instagramItem
    return (
      <div>
        <Header as='h1'>{name}</Header>
        <Label as='a' basic color='blue'>
          <a href={url} target='_blank'>
            {url}
          </a>
        </Label>
        <List celled>
          {infoConnection.edges.map(edge => <InfoItem  {...edge.node} />)}
        </List>
      </div>
    )
  }
}

const instagramItemQuery = gql`
  query instagramItem($id: ID!) {
    instagramItem(id: $id) {
      id
      name
      url
      infoConnection {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            image
            numberOfLikes
            numberOfComments
            comments
          }
        }
      }
    }
  }
`

export default compose(
  graphql(instagramItemQuery, {
    options (props) {
      const {activeItem} = props
      return {
        variables: {
          id: activeItem && activeItem.id
        }
      }
    }
  })
)(InfoList)
