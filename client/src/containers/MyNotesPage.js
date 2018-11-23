import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { MyNote } from './mynotes'

class MyNotesPage extends React.Component {
  render () {
    const { threads } = this.props
    const { edges } = threads

    return (
      <div>
        {
          edges.map(({ node }) => <MyNote key={`thread-${node.id}`} node={node} />)
        }
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
