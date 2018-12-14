import React from 'react'
import { Icon } from 'semantic-ui-react'

class EditIcon extends React.Component {
  render () {
    const { view, update } = this.props
    return (
      <div>
        <Icon name={view ? 'edit' : 'sticky note'} link onClick={() => update(!view)}/>
      </div>
    )
  }
}

class LikeIcon extends React.Component {
  render () {
    const { liked, likeNote } = this.props
    return (
      <div>
        <Icon name='thumbs up outline' link />
      </div>
    )
  }
}

export default class NoteMenu extends React.Component {
  renderViewOnlyIcons () {
    return (
      <React.Fragment>
        <LikeIcon />
      </React.Fragment>
    )
  }

  renderAuthorizedToEditIcons () {
    const { noteId, deleteNote } = this.props
    const { editReadOnly, updateEditReadOnly } = this.props
    return (
      <React.Fragment>
        <EditIcon view={editReadOnly} update={updateEditReadOnly} />
        ___
        <div>
          <Icon link name='trash' onClick={() => deleteNote(noteId)} />
        </div>
      </React.Fragment>
    )
  }

  render () {
    const { viewOnly } = this.props
    return (
      <div class='note-menu'>
        {
          viewOnly ? 
          this.renderViewOnlyIcons() :
          this.renderAuthorizedToEditIcons()
        }
      </div>
    )
  }
}