import React from 'react'

import {
  BOLD, ITALIC, UNDERLINE, HIGHLIGHT
} from './types'

export default {
  [BOLD]: (props) => <span {...props.attributes} class='inline-bold'>{props.children}</span>,
  [ITALIC]: (props) => <span {...props.attributes} class='inline-italic'>{props.children}</span>,
  [UNDERLINE]: (props) => <span {...props.attributes} class='inline-underline'>{props.children}</span>,
  [HIGHLIGHT]: (props) => <span {...props.attributes} class='inline-highlight'>{props.children}</span>
}