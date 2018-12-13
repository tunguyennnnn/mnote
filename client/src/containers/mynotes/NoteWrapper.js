import React from 'react'
import MyNoteHeader from './MyNoteHeader'
import NoteMenu from './NoteMenu'

export default class NoteWrapper extends React.Component {
  render () {
    const { children, authorInfo, nodeId, viewOnly, updateEditReadOnly, editReadOnly } = this.props
    return (
      <div class='note-container'>
        <div class='note-header-container'>
          <MyNoteHeader 
            authorInfo={authorInfo} 
            viewOnly={viewOnly}
            updateEditReadOnly={updateEditReadOnly}
            editReadOnly={editReadOnly}
          />
        </div>
        <div class='note-body-container'>
          <div class='note-menu-container'>
            <NoteMenu viewOnly={viewOnly} editReadOnly={editReadOnly} updateEditReadOnly={updateEditReadOnly} />
          </div>
          <div class='note-body'>
            { children }
          </div>
        </div>
      </div>
    )
  }
}