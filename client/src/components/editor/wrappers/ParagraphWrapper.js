import React from 'react'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

import { insertInParagraphBlock, insertParagraph } from '../helpers/insert'
import Menu from './Menu'

import {
  PARAGRAPH,
  TABLE,
  ORDERED_LIST,
  UNORDERED_LIST,
  MATH,
  CODE,
  LINK_BLOCK
} from '../types'

const EmpyParagraphActionList = [
  { type: PARAGRAPH, icon: 'paragraph' },
  { type: MATH, icon: 'superscript' },
  { type: CODE, icon: 'keyboard' },
  { type: TABLE, icon: 'th' },
  { type: ORDERED_LIST, icon: 'list ol' },
  { type: UNORDERED_LIST, icon: 'list alternate' },
  { type: LINK_BLOCK, icon: 'linkify' },
  { type: 'deletion', icon: 'trash' },
]

const NonEmpyParagraphActionList = [
  { type: PARAGRAPH, icon: 'paragraph' },
  { type: 'deletion', icon: 'trash' },
]

export default class ParagraphWrapper extends React.Component {
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
    const actionList = _.isEmpty(_.trim(node.text)) ? EmpyParagraphActionList : NonEmpyParagraphActionList
    if (!isFocused || !openMenu) return null
    return <Menu actionList={actionList} handleClick={this.onMenuActionClick} />
  }

  renderMenuIcon () {
    const { openMenu } = this.state
    const { isFocused } = this.props
    if (!isFocused) return null
    return (
      <div contentEditable={false} class='menu-icon-container'
        onMouseDown={() => this.setState({ openMenu: !openMenu })}
      >
        <Icon link name='plus' contentEditable={false} />
      </div>
    )
  }

  render () {
    const { children } = this.props
    const { isFocused } = this.props
    return (
      <div class={`editor-paragraph-wrapper ${isFocused && 'focus'}`}>
        <div onClick={() => this.setState({ openMenu: false })}>
          {children}
        </div>
        {this.renderMenuIcon()}
        {this.renderMenu()}
      </div>
    )
  }
}