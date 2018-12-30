import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import katex from 'katex'

import UnnestedInline from './UnnestedInline'
import {InlineDelimiterConfig} from '../plugins/inline-text-plugins'

const EMPTY_MATH = 'math'
export default class InlineMath extends React.Component {
  onClickToPreivew = (event) => {
    const { node, editor } = this.props
    editor.moveTo(node.key, node.text.length - 1).focus()
  }

  renderPreview = () => {
    const {node, attributes} = this.props
    let {text: math, type} = node
    math = _.trim(
      math.replace(InlineDelimiterConfig[type].startRegex, '')
          .replace(InlineDelimiterConfig[type].endRegex, '')
    )
    try {
      if (math) math = ReactHtmlParser(katex.renderToString(math))
    } catch (e) {
      // console.log(e)
    }
    const style = {textAlign: 'center', zIndex: -101}
    return (
      <span {...attributes} tyle={style} contentEditable={false}
        class='editor-inline-math'
        onClick={this.onClickToPreivew}
      >
        {math || 'math formula'}
      </span>
    )
  }

  render () {
    return (
      <UnnestedInline {...this.props} renderPreview={this.renderPreview} />
    )
  }
}