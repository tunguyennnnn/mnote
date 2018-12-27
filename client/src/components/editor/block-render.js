import './render.scss'
import React from 'react'

import Math from './custom-render/Math'
import LinkBlock from './custom-render/LinkBlock'

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
  TABLE_ROW,
  LINK_BLOCK
} from './types'

export default {
  [TITLE]: (props) => <p class='editor-header' {...props.attributes}>{props.children}</p>,
  [PARAGRAPH]: (props) =>
    <p {...props.attributes} class='editor-p'>{props.children}</p>,
  [ORDERED_LIST]: (props) => 
    <ol {...props.attributes} class='editor-ol'>{props.children}</ol>,
  [UNORDERED_LIST]: (props) => 
    <ul {...props.attributes} class='editor-ul'>{props.children}</ul>,
  [LIST_ITEM]: (props) => 
    <li {...props.attributes} class='editor-li'>{props.children}</li>,
  [TABLE]: (props) =>
    <tb {...this.attributes} class='editor-tb'>{props.children}</tb>,
  [TABLE_ROW]: (props) =>
    <tr {...this.attributes} class='editor-tr'>{props.children}</tr>,
  [TABLE_CELL]: (props) => 
    <td {...this.attributes} class='editor-tc'>{props.children}</td>,
  [MATH]: (props) => <Math {...props} />,
  [LINK_BLOCK]: (props) => <LinkBlock {...props} />,
  [CODE]: (props) => {
    const { attributes, children } = props
    return (
      <pre class='editor-code' {...attributes}>
        <code>{children}</code>
      </pre>
    )
  },
  [CODE_LINE]: (props) =>
      <div class='editor-code-line' {...props.attributes}>{props.children}</div>
}
