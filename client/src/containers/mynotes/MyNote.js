import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ThreadEditor } from '../../components'

class MyNote extends React.Component {
  static propTypes = {
    node: PropTypes.object
  }

  state = {
    view: true
  }

  render () {
    const { node, updateNote } = this.props
    const { id, detail } = node
    const { view } = this.state
    return (
      <Card className='mynote-container' centered fluid>
        <Card.Content>
          <div class='note-menu-container'>
            {
              view && <Icon link name='edit' onClick={() => this.setState({ view: false })} />
            }
            {
              !view && <Icon link name='sticky note' onClick={() => this.setState({ view: true })} />
            }
          </div>
          <ThreadEditor id={id}
            content={detail}
            update={updateNote}
            readOnly={this.state.view}
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
