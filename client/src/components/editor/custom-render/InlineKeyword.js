import React from 'react'
import _ from 'lodash'

import UnnestedInline from './UnnestedInline'
import {InlineDelimiterConfig} from '../plugins/inline-text-plugins'

export default class KeyWord extends React.Component {
  onClickToPreivew = (event) => {
    const { node, editor } = this.props
    editor.moveTo(node.key, node.text.length - 1).focus()
  }

  renderPreview = () => {
    const { node, attributes } = this.props
    let { text, type } = node
    text = _.trim(
      text.replace(InlineDelimiterConfig[type].startRegex, '')
          .replace(InlineDelimiterConfig[type].endRegex, '')
    )
    return (
      <code {...attributes} contentEditable={false}
        class='editor-inline-keyword'
        onClick={this.onClickToPreivew}
      >
        {text}
      </code>
    )
  }

  render () {
    return (
      <UnnestedInline {...this.props} renderPreview={this.renderPreview} />
    )
  }
}