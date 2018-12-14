import React from 'react'
import MyNoteHeader from './MyNoteHeader'
import NoteMenu from './NoteMenu'

export default class NoteWrapper extends React.Component {
  render () {
    const { children, authorInfo, noteId, viewOnly, updateEditReadOnly, deleteNote, editReadOnly } = this.props
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
            <NoteMenu viewOnly={viewOnly} 
              noteId={noteId}
              editReadOnly={editReadOnly} 
              updateEditReadOnly={updateEditReadOnly} 
              deleteNote={deleteNote}
            />
          </div>
          <div class='note-body'>
            { children }
          </div>
        </div>
      </div>
    )
  }
}