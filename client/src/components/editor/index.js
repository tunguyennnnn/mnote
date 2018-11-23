import React from 'react'
import { Editor } from 'slate-react'
import Plain from 'slate-plain-serializer'

import schema from './schema'
import blockRender from './block-render'

export default class extends React.Component {
  state = {
    value: Plain.deserialize('')
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  renderNode = (props, editor, next) => {
    console.log(props)
    const { node } = props
    if (!blockRender[node.type]) return next()
    return blockRender[node.type].call(null, props)
  }

  render () {
    const { readOnly } = this.props
    console.log(this.state.value)
    return (
      <Editor
        value={this.state.value}
        placeholder='Some fact...'
        readOnly={readOnly}
        schema={schema}
        onChange={this.onChange}
        renderNode={this.renderNode}
      />
    )
  }
}
