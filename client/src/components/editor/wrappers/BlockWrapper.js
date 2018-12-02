import './wrapper.scss'
import React from 'react'
import _ from 'lodash'

import ParagraphWrapper from './ParagraphWrapper'
import OtherBlockWrapper from './OtherBlockWrapper'

import {
  PARAGRAPH,
  TABLE,
  ORDERED_LIST,
  UNORDERED_LIST,
  MATH,
  CODE
} from '../types'

const PrimaryTypes = [
  TABLE, ORDERED_LIST, UNORDERED_LIST, MATH, CODE
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