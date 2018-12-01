import './wrapper.scss'
import React from 'react'

import ParagraphWrapper from './ParagraphWrapper'
import OtherBlockWrapper from './OtherBlockWrapper'

import {
  PARAGRAPH
} from '../types'

export default class BlockWrapper extends React.Component {
  render () {
    const { slateProps, type, children } = this.props
    if (type === PARAGRAPH) {
      return (
        <ParagraphWrapper {...slateProps}>
          {children}
        </ParagraphWrapper>
      )
    }
    return children
  }
}