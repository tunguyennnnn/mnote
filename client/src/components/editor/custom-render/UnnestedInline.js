import React from 'react'

export default class UnnestedInline extends React.Component {
  render () {
    const {children, attributes, isFocused, isSelected, renderPreview} = this.props
    const writeStyle = !isFocused ? {position: 'absolute', left: 0, zIndex: -100, whiteSpace: 'nowrap', opacity: '0'} : {}
    return (
      <span {...attributes} class={`inline-wrapper ${isSelected ? 'selected' : ''}`}>
        {!isFocused && renderPreview()}
        <span style={writeStyle}>{children}</span>
      </span>
    )
  }
}