import './editor.scss'
import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { Subject } from 'rxjs/Subject'

import plugins from './plugins'
import InlineMenu from './InlineMenu'
import BlockWrapper from './wrappers/BlockWrapper'
import { debounceTime } from 'rxjs/operators'
import schema from './schema'
import blockRender from './block-render'
import inlineRender from './inline-render'

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
        const { readOnly } = this.props
        if (readOnly) return
        const { value } = this.state
        const { document } = value
        const detail = document.toJS().nodes
        const { id, update } = this.props
        update({ variables: { id, detail } })
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
    return (
      <BlockWrapper slateProps={props} editor={editor} type={node.type}>
        {blockRender[node.type].call(null, props)}
      </BlockWrapper>
    )
  }

  renderMark = (props, editor, next) => {
    const { mark, attributes, children } = props
    if (!inlineRender[mark.type]) return next()
    return inlineRender[mark.type].call(null, props)
  }

  renderEditor = (props, editor, next) => {
    const { value } = this.state
    this.editor = editor
    const children = next()
    return (
      <React.Fragment>
        {children}
        <InlineMenu
          value={value}
          editor={editor}
          onChange={this.onChange}
        />
      </React.Fragment>
    )
  }

  render () {
    const { readOnly } = this.props
    return (
      <div class='editor-container'>
        <Editor
          value={this.state.value}
          renderEditor={this.renderEditor}
          placeholder='Some fact...'
          readOnly={readOnly}
          plugins={plugins}
          schema={schema}
          onChange={this.onChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    )
  }
}
