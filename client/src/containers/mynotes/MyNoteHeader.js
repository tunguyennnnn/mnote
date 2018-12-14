import React from 'react'

import NoteAuthor from './NoteAuthor'

export default class MyNoteHeader extends React.Component {
  render () {
    const { authorInfo } = this.props
    const { author } = authorInfo
    return (
      <div class='note-author-container'>
        {author && <NoteAuthor author={author} />}
      </div>
    )
  }
}