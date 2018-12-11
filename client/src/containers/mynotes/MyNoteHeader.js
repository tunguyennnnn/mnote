import React from 'react'
import { Icon } from 'semantic-ui-react'

import NoteAuthor from './NoteAuthor'

export default class MyNoteHeader extends React.Component {
  renderActions () {
    const { isView, updateView, deleteNote, authorInfo } = this.props
    const { authorizationInfo } = authorInfo
    if (!authorizationInfo.canEdit) return null
    return (
      <div class='note-menu-container'>
        {
          isView && <Icon link name='edit' onClick={() => updateView(false)} />
        }
        {
          !isView && <Icon link name='sticky note' onClick={() => updateView(true)} />
        }
        <Icon link name='trash' onClick={deleteNote} />
      </div>
    )
  }

  render () {
    const { authorInfo } = this.props
    const { author } = authorInfo
    return (
      <div>
        <div class='note-author-container'>
          {author && <NoteAuthor author={author} />}
        </div>
        { this.renderActions() }
      </div>
    )
  }
}