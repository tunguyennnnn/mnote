import './MyNotePage.scss'

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Card } from 'semantic-ui-react'

import { MyNote } from './mynotes'

class MyNotesPage extends React.Component {
  render () {
    const { threads } = this.props
    const { edges } = threads

    return (
      <div class='mynote-page-container'>
        <Card.Group>
          {
            edges.map(({ node }) =>
              <MyNote key={`thread-${node.id}`} node={node} />
            )
          }
        </Card.Group>
      </div>
    )
  }
}

const myNotesQuery = gql`
  query threads($cursor: String, $limit: Int) {
    threads(cursor: $cursor, limit: $limit) {
      pageInfo {
      hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          detail
        }
      }
    }
  }
`

export default function () {
  return (
    <Query
      query={myNotesQuery}
      variables={{}}
    >
      {
        ({ data, loading, error, fetchMore }) => {
          if (loading) return <div>...</div>
          return <MyNotesPage {...data} />
        }
      }
    </Query>
  )
}
