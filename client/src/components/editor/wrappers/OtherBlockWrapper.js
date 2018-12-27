import React from 'react'
import { Icon } from 'semantic-ui-react'

import Menu from './Menu'
import {
  PARAGRAPH
} from '../types'

const ActionList = [
  { type: PARAGRAPH, icon: 'paragraph' },
  { type: 'deletion', icon: 'trash'}
]


export default class OtherBlockWrapper extends React.Component {
  state = {
    openMenu: false
  }

  onMenuActionClick = (type) => {
    const { node, editor } = this.props
    if (type === 'deletion') return editor.removeNodeByKey(node.key)
    return insertInParagraphBlock(editor, type, node)
  }

  renderMenu () {
    const { isFocused, node } = this.props
    const { openMenu } = this.state
    if (!isFocused || !openMenu) return null
    return <Menu actionList={ActionList} handleClick={this.onMenuActionClick} />
  }

  renderMenuIcon () {
    const { openMenu } = this.state
    const { isFocused } = this.props
    if (!isFocused) return null
    return (
      <div contentEditable={false} class='menu-icon-container'
        onMouseDown={() => this.setState({ openMenu: !openMenu })}
      >
        <Icon link name='plus' />
      </div>
    )
  }

  render () {
    const { children, attributes } = this.props
    return (
      <div {...attributes} class='editor-other-block-wrapper'>
        <div {...attributes}
          onClick={() => this.setState({ openMenu: false })}
        >
          {children}
        </div>
        {this.renderMenuIcon()}
        {this.renderMenu()}
      </div>
    )
  }
}