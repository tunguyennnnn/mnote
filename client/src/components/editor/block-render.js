import React from 'react'

import Math from './custom-render/Math'

import {
  PARAGRAPH,
  CODE,
  MATH,
  TITLE,
  CODE_LINE,
  ORDERED_LIST,
  UNORDERED_LIST,
  LIST_ITEM,
  TABLE,
  TABLE_CELL,
  TABLE_ROW
} from './types'

export default {
  [TITLE]: (props) => <h3 {...props.attributes}>{props.children}</h3>,
  [PARAGRAPH]: (props) =>
    <p {...props.attributes}>{props.children}</p>,
  [ORDERED_LIST]: (props) => 
    <ol {...props.attributes}>{props.children}</ol>,
  [UNORDERED_LIST]: (props) => 
    <ul {...props.attributes}>{props.children}</ul>,
  [LIST_ITEM]: (props) => 
    <li {...props.attributes}>{props.children}</li>,
  [TABLE]: (props) =>
    <tb {...this.attributes}>{props.children}</tb>,
  [TABLE_ROW]: (props) =>
    <tr {...this.attributes}>{props.children}</tr>,
  [TABLE_CELL]: (props) => 
    <td {...this.attributes}>{props.children}</td>,
  [MATH]: (props) => <Math {...props} />
}
