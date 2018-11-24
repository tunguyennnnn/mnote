import React from 'react'
import { Editor } from 'slate-react'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import { Subject } from 'rxjs/Subject'

import { debounceTime } from 'rxjs/operators'
import schema from './schema'
import blockRender from './block-render'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.updateSubject = new Subject()

    this.state = {
      value: Value.fromJSON({ document: { nodes: props.content } })
    }
  }

  listenToUpdate () {
    this.updateSubject
      .pipe(
        debounceTime(800)
      )
      .subscribe(async () => {
        const { value } = this.state
        const { document } = value
        const detail = document.toJS().nodes
        const { id, update } = this.props
        console.log(update({ variables: { id, detail } }))
      })
  }

  componentDidMount () {
    this.listenToUpdate()
  }

  onChange = ({ value }) => {
    this.updateSubject.next()
    this.setState({ value })
  }

  renderNode = (props, editor, next) => {
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
