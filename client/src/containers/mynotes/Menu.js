import React from 'react'
import { Icon, Button } from 'semantic-ui-react'

export default class Menu extends React.Component {
  render () {
    return (
      <div class='mynote-menu-container'>
        <h2>Our notes to share</h2>
        <div>
          <Button basic color='grey'
            onClick={() => {
              this.props.createNote()
            }}
          >
            New note
          </Button>
        </div>
      </div>
    )
  }
}
