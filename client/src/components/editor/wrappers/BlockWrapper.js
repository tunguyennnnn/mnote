import './wrapper.scss'
import React from 'react'
import _ from 'lodash'

import ParagraphWrapper from './ParagraphWrapper'
import OtherBlockWrapper from './OtherBlockWrapper'

import {
  PARAGRAPH,
  ORDERED_LIST,
  UNORDERED_LIST,
  MATH,
  CODE,
  LINK_BLOCK
} from '../types'

const PrimaryTypes = [
  ORDERED_LIST, UNORDERED_LIST, MATH, CODE, LINK_BLOCK
]

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
    if (_.includes(PrimaryTypes, type)) {
      return (
        <OtherBlockWrapper {...slateProps}>
          {children}
        </OtherBlockWrapper>
      )
    }
    return children
  }
}