import React from 'react'

export default class LinkBlock extends React.Component {
  render () {
    const { attributes, children, isFocused } = this.props
    return (
      <div {...attributes} class='editor-link-block'>
        <p {...attributes}>{children}</p>
      </div>
    )
  }
}