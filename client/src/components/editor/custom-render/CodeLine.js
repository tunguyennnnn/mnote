import React from 'react'

import Placeholder from './Placeholder'

export default class CodeLine extends React.Component {
  render () {
    const { attributes, children, node } = this.props
    return (
      <div class='editor-code-line' {...attributes}>
        <Placeholder node={node} placeholderText='//code...' />
        {children}
      </div>
    )
  }
}