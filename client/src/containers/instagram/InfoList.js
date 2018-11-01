import React from 'react'
import { List, Header, Label } from 'semantic-ui-react'
import {graphql, compose, Query} from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import InfoItem from './InfoItem'

class InfoList extends React.Component {
  componentDidUpdate () {
    window.loadMorePosts = this.props.loadMorePosts
  }

  render () {
    const { data } = this.props
    const { instagramItem } = data
    console.log(instagramItem)
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
        <button onClick={() => this.props.loadMorePosts()} >More</button>
      </div>
    )
  }
}

const instagramItemQuery = gql`
  query instagramItem($id: ID!, $cursor: String, $limit: Int) {
    instagramItem(id: $id) {
      id
      name
      url
      infoConnection (cursor: $cursor, limit: $limit) {
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

export default function ({ activeItem }) {
  return (
    <Query
      query={instagramItemQuery}
      variables={{id: activeItem.id}}
    >
      {
        ({ data, loading, error, fetchMore }) => {
          console.log(data)
          if (loading) return <div>Loading</div>
          return (
            <InfoList
              data={data}
              loadMorePosts={() =>
                fetchMore({
                  query: instagramItemQuery,
                  variables: {
                    id: activeItem.id,
                    cursor: _.last(data.instagramItem.infoConnection.edges).cursor
                  },
                  updateQuery (previousResult, { fetchMoreResult }) {
                    const { instagramItem } = previousResult
                    const { infoConnection: oldInfoConnection } = instagramItem
                    const { instagramItem: newInstagramItem } = fetchMoreResult
                    const { infoConnection: newInfoConnection } = newInstagramItem
                    const newList = {
                      ...previousResult,
                      instagramItem: {
                        ...instagramItem,
                        infoConnection: {
                          ...oldInfoConnection,
                          pageInfo: newInfoConnection.pageInfo,
                          edges: [
                            ...oldInfoConnection.edges, ...newInfoConnection.edges
                          ]
                        }
                      }
                    }
                    console.log(newList)
                    return newList
                  }
                })
              }
            />
          )
        }
      }
    </Query>
  )
}
