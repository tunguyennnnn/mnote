import './mynotes/MyNotePage.scss'

import React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card } from 'semantic-ui-react'

import { MyNote, NoteMenu } from './mynotes'

class MyNotesPage extends React.Component {
  render () {
    const { data } = this.props
    if (data.loading) return null
    const { threads } = data
  
    const { edges } = threads

    return (
      <div class='mynote-page-container'>
        <Card.Group>
          {
            edges.map(({ node }) =>
              <MyNote key={`thread-${node.id}`}
                viewOnly
                node={node}
                deleteNote={() => this.deleteNote(node.id)}
              />
            )
          }
        </Card.Group>
      </div>
    )
  }
}

const notesQuery = gql`
  query threads($cursor: String, $limit: Int) {
    threads(cursor: $cursor, limit: $limit) {
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
  graphql(notesQuery, {
    options (props) {
      return {
        variables: {}
      }
    }
  })
)(MyNotesPage)
