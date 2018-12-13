import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { Card } from 'semantic-ui-react'

import { MyNote, NoteMenu } from './mynotes'

class NoterPage extends React.Component {
  render () {
    const { data } = this.props
    if (data.loading) return <div>loading...</div>
    const { userThreads } = data
    const { edges } = userThreads
    return (
      <div class='noter-page-container'>
        <Card.Group>
          {
            edges.map(({ node }) =>
              <MyNote key={`thread-${node.id}`}
                node={node}
              />
            )
          }
        </Card.Group>
      </div>
    )
  }
}

const myNotesQuery = gql`
  query userThreads($userId: ID!, $cursor: String, $limit: Int) {
    userThreads(userId: $userId, cursor: $cursor, limit: $limit) {
      pageInfo {
      hasNextPage
      }
      edges {
        cursor
        node {
          id
          detail
          authorInfo {
            authorizationInfo {
              canView
              canEdit
            }
            author {
              id
              sub
              email
              metaData
            }
          }
        }
      }
    }
  }
`

export default compose(
  graphql(myNotesQuery, {
    options (props) {
      console.log(props)
      return {
        variables: {
          userId: props.match.params.id
        }
      }
    }
  })
)(NoterPage)