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
    const style = {position: 'absolute', width: '100%'}
    return (
      <div style={style} contentEditable={false}>{math}</div>
    )
  }
  render () {
    const { attributes, children, isSelected} = this.props
    const writeStyle = !isSelected ? {display: 'inline-block', width: '0', whiteSpace: 'nowrap', opacity: '0'} : {}
    return (
      <div {...attributes} class='editor-math-container'>
        {!isSelected && this.renderMath()}
        <div style={writeStyle}>{children}</div>
      </div>
    )
  }
}