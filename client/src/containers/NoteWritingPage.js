import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

class NoteWritingPage extends React.Component {
  render () {
    const { data } = this.props
    if (data.loading) return <div>loading...</div>
    const { note } = data
    console.log(data)
    console.log(note)
    return (
      <div>
        
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
  })
)(NoteWritingPage)