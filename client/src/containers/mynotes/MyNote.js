import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import NoteWrapper from './NoteWrapper'
import { ThreadEditor } from '../../components'

class MyNote extends React.Component {
  static propTypes = {
    node: PropTypes.object
  }

  state = {
    editReadOnly: true
  }

  updateEditReadOnly = (editReadOnly) => {
    const { viewOnly } = this.props
    !viewOnly && this.setState({ editReadOnly })
  }

  render () {
    const { node, updateNote, deleteNote, viewOnly } = this.props
    const { id, detail, authorInfo } = node
    const { editReadOnly } = this.state
    return (
      <Card className='mynote-container' centered fluid>
        <Card.Content>
          <NoteWrapper 
            noteId={id} 
            deleteNote={deleteNote}
            authorInfo={authorInfo}
            viewOnly={viewOnly}
            editReadOnly={editReadOnly}
            updateEditReadOnly={this.updateEditReadOnly}
          >
            <ThreadEditor id={id}
              content={detail}
              update={updateNote}
              readOnly={viewOnly || editReadOnly}
            />
          </NoteWrapper>
        </Card.Content>
      </Card>
    )
  }
}


const updateNoteMutation = gql`
  mutation updateThread($id: ID!, $detail: JSON!) {
    updateThread(id: $id, detail: $detail) {
      id
      detail
    }
  }
`

export default function (args) {
  return (
    <Mutation
      mutation={updateNoteMutation}
    >
      {
        (updateNote, { data }) => {
          return <MyNote {...args} updateNote={updateNote} />
        }
      }
    </Mutation>
  )
}
