import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import katex from 'katex'

export default class Math extends React.Component {
  renderMath () {
    const { node } = this.props
    let math = node.text
    try {
      if (math) math = ReactHtmlParser(katex.renderToString(math))
    } catch (e) {
    }
    return (
      <div class='formula' contentEditable={false}>{math}</div>
    )
  }
  render () {
    const { attributes, children, isSelected} = this.props
    const writeStyle = !isSelected ? {display: 'inline-block', width: '0', whiteSpace: 'nowrap', opacity: '0'} : {}
    return (
      <div {...attributes} class='editor-math-container'>
        <div class='editor-math-preview'>  
          {!isSelected && this.renderMath()}
        </div>
        <div style={writeStyle}>{children}</div>
      </div>
    )
  }
}
