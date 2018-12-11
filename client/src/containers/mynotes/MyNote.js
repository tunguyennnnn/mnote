import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import MyNoteHeader from './MyNoteHeader'
import NoteAuthor from './NoteAuthor'
import { ThreadEditor } from '../../components'

class MyNote extends React.Component {
  static propTypes = {
    node: PropTypes.object
  }

  state = {
    view: true
  }

  updateView = (view) => {
    this.setState({ view })
  }

  render () {
    const { node, updateNote, deleteNote } = this.props
    const { id, detail, author, authorInfo } = node
    const { view } = this.state
    return (
      <Card className='mynote-container' centered fluid>
        <Card.Content>
          <MyNoteHeader authorInfo={authorInfo}
            isView={view}
            updateView={this.updateView}
            deleteNote={deleteNote}
          />
          <ThreadEditor id={id}
            content={detail}
            update={updateNote}
            readOnly={view}
          />
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
