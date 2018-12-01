import React from 'react'

export default class ParagraphWrapper extends React.Component {
  render () {
    const { children } = this.props
    const { isFocused } = this.props
    return (
      <div class={`editor-paragraph-wrapper ${isFocused && 'focus'}`}>
        {children}
      </div>
    )
  }
}