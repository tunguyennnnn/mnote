import React from 'react'
import ReactDOM from 'react-dom'
import { Icon } from 'semantic-ui-react'

import {
  BOLD, ITALIC, UNDERLINE, HIGHLIGHT, PARAGRAPH
} from './types'

export default class MarkMenu extends React.Component {
  componentDidUpdate () {
    this.showMenu()
  }

  showMenu () {
    const { value } = this.props
    if (value.blocks.size > 1) return
    const {menuRef: menu} = this
    const isHighligted = value.selection.isFocused && !value.selection.isCollapsed
    if (
      value.blocks.size !== 1 ||
      value.inlines.size > 0 ||
      value.anchorBlock.type !== PARAGRAPH || 
      !isHighligted
    ) {
      menu.style.display = 'none'
      return
    }

    const selection = window.getSelection()
    if (!selection.focusNode) return
    const range = selection.getRangeAt(0)

    const rect = range.getBoundingClientRect()
    menu.style.display = 'block'
    let top = rect.top + window.scrollY - menu.offsetHeight
    let left = rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2

    menu.style.top = `${top}px`
    menu.style.left = `${left}px`
  }

  render () {
    return ReactDOM.createPortal(
      <div class='inline-menu-container'
        ref={(el) => this.menuRef = el}
      >
        <Icon name='bold' />
        <Icon name='italic' />
        <Icon name='underline' />
        <Icon name='pencil alternate' />
      </div>
    , document.getElementsByTagName('body')[0])
  }
}