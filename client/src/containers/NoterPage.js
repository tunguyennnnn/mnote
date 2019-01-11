import './noters/Noter.scss'
import React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { Card } from 'semantic-ui-react'

import { MyNote, NoteMenu } from './mynotes'
import CheckList from './noters/CheckList'

class NoterPage extends React.Component {
  deleteNote = async (id) => {
    const { id: userId } = this.props.match.params
    try {
      const c = window.confirm('Are you sure to delete the note?')
      if (!c) return
      const { deleteNote } = this.props
      const response = await deleteNote({
        variables: { id },
        update: (proxy, { data: { deleteNote } }) => {
          try {
            if (!deleteNote) return
            const data = proxy.readQuery({ query: myNotesQuery, variables: { userId } })
  
            data.userThreads.edges = data.userThreads.edges.filter(({ node }) => node.id !== id)
          
            proxy.writeQuery({ query: myNotesQuery, data, variables: { userId } })
          } catch (e) {
            console.log(e)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  createNote = async () => {
    const { id: userId } = this.props.match.params
    try {
      const { createNote } = this.props
      const response = await createNote({
        variables: {},
        update: (proxy, { data: { newNote } }) => { 
          const data = proxy.readQuery({ query: myNotesQuery, variables: { userId } })
  
          data.userThreads.edges = [
            { cursor: newNote.updatedAt, node: newNote, __typename: "ThreadConnectionEdge" },
            ...data.userThreads.edges
          ]
          proxy.writeQuery({ query: myNotesQuery, data, variables: { userId } })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const { data } = this.props
    if (data.loading) return <div>loading...</div>
    const { userThreads } = data
    const { edges } = userThreads
    return (
      <div class='noter-page-container'>
        <NoteMenu createNote={this.createNote} />
        <CheckList userId={this.props.match.params.id} />
        <Card.Group>
          {
            edges.map(({ node }) =>
              <MyNote key={`thread-${node.id}`}
                node={node}
                deleteNote={this.deleteNote}
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

const createNoteMutation = gql`
  mutation createThread {
    newNote: createThread {
      id
      detail
      updatedAt
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
`

const deleteNoteMutation = gql`
  mutation deleteThread ($id: ID!) {
    deleteNote: deleteThread (id: $id)
  }
`

export default compose(
  graphql(myNotesQuery, {
    options (props) {
      return {
        variables: {
          userId: props.match.params.id
        }
      }
    }
  }),
  graphql(createNoteMutation, { name: 'createNote' }),
  graphql(deleteNoteMutation, { name: 'deleteNote' })
)(NoterPage)