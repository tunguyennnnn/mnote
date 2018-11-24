import './mynotes/MyNotePage.scss'

import React from 'react'
import { Query, compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card } from 'semantic-ui-react'

import { MyNote, NoteMenu } from './mynotes'

class MyNotesPage extends React.Component {
  createNote = async () => {
    try {
      const { createNote } = this.props
      const response = await createNote({
        variables: {},
        update: (proxy, { data: { newNote }  }) => {
          console.log(newNote)
          const data = proxy.readQuery({ query: myNotesQuery, variables: {} })
          console.log(data)
          data.threads.edges = [
            { cursor: newNote.updatedAt, node: newNote, __typename: "ThreadConnectionEdge" },
            ...data.threads.edges
          ]
          proxy.writeQuery({ query: myNotesQuery, data })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const { data } = this.props
    if (data.loading) return null
    const { threads } = data
    // const { threads } = this.props
    const { edges } = threads

    return (
      <div class='mynote-page-container'>
        <NoteMenu createNote={this.createNote} />
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
          detail
        }
      }
    }
  }
`

const createNoteMutation = gql`
  mutation createThread {
    newNote: createThread {
      id
      detail
      updatedAt
    }
  }
`

export default compose(
  graphql(myNotesQuery, {
    options (props) {
      return {
        variables: {}
      }
    }
  }),
  graphql(createNoteMutation, { name: 'createNote' })
)(MyNotesPage)
