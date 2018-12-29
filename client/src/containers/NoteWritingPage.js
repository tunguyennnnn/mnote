import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { ThreadEditor } from '../components'

class NoteWritingPage extends React.Component {
  render () {
    const { data, updateNote } = this.props
    if (data.loading) return <div>loading...</div>
    const { note } = data
    if (!note) return null
    const { id, detail } = note
    return (
      <div>
        <ThreadEditor 
          id={id}
          content={detail}
          update={updateNote}
        />
      </div>
    )
  }
}

const queryNote = gql`
  query thread($id: ID!) {
    note: thread (id: $id) {
      id
      title
      detail
      authorInfo {
        authorizationInfo {
          canView
          canEdit
        }
        author {
          id
          email
          metaData
        }
      }
      updatedAt
    }
  }
`

const updateNoteMutation = gql`
  mutation updateThread($id: ID!, $detail: JSON!) {
    updateThread(id: $id, detail: $detail) {
      id
      detail
    }
  }
`

export default compose(
  graphql(queryNote, {
    options (props) {
      console.log(props)
      return {
        variables: {
          id: props.match.params.id
        }
      }
    }
  }),
  graphql(updateNoteMutation, { name: 'updateNote' })
)(NoteWritingPage)