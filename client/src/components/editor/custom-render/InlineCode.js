import React from 'react'
import UnnestedInline from './UnnestedInline'
import {InlineDelimiterConfig} from '../plugins/inline-text-plugins'

export default class InlineCode extends React.Component {
  onClickToPreivew = (event) => {
    const { node, editor } = this.props
    editor.moveTo(node.key, node.text.length - 1).focus()
  }

  renderPreview = () => {
    const { node, attributes } = this.props
    const { type } = node
    let code = _.trim(node.text)
          .replace(InlineDelimiterConfig[type].startRegex, '')
          .replace(InlineDelimiterConfig[type].endRegex, '');
    return (
      <code {...attributes} class='editor-inline-code'
        contentEditable={false}
        onClick={this.onClickToPreivew}
      >
        {code}
      </code>
    )
  }

  render () {
    return (
      <UnnestedInline {...this.props} renderPreview={this.renderPreview} />
    )
  }
}