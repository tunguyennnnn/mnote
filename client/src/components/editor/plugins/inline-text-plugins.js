import _ from 'lodash'
import {
  INLINE_CODE,
  INLINE_QUOTE,
  INLINE_LINK,
  INLINE_MATH,
  INLINE_KEYWORD,
  PARAGRAPH
} from '../types'

export const InlineDelimiterConfig = {
  [INLINE_MATH]: {
    regex: /^\$.*\$$/,
    startChar: '$',
    endChar: '$',
    startRegex: /^\$/,
    endRegex: /\$$/
  },
  [INLINE_CODE]: {
    regex: /^`.*`$/,
    startChar: '`',
    endChar: '`',
    startRegex: /^`/,
    endRegex: /`$/
  },
  [INLINE_QUOTE]: {
    regex: /^“.*”$/,
    startChar: '“',
    endChar: '”',
    startRegex: /^“/,
    endRegex: /”$/
  },
  [INLINE_KEYWORD]: {
    regex: /^<.*>$/,
    startChar: '<',
    endChar: '>',
    startRegex: /^</,
    endRegex: />$/
  },
  [INLINE_LINK]: {
    regex: /^{.*}$/,
    startChar: '{',
    endChar: '}',
    startRegex: /^{/,
    endRegex: /}$/
  }
}

const ARROW_LEFT = 37
const BACKSPACE = 8
const ENTER = 13

function onInlineFocusKeyDown (event, editor, next) {
  const {which} = event
  const {value} = editor
  const {selection, focusInline} = value
  switch (which) {
    case ENTER: {
      event.preventDefault()
      return editor
    }
    case BACKSPACE: {
      if (selection.anchor.offset !== 1) return next()
      const {text, type} = focusInline
      const {startRegex, endRegex} = InlineDelimiterConfig[type]
      const contentText = _.trim(
        text.replace(startRegex, '').replace(endRegex, '')
      )
      if (contentText) return next()
      return editor.removeNodeByKey(focusInline.key)
    }
    case ARROW_LEFT: {
      if (selection.anchor.offset !== 1) return next()
      return editor.moveFocusBackward(1).moveAnchorBackward(1)
    }
    default: {
      if (selection.anchor.offset !== 0) return next()
      return editor.moveFocusForward(1).moveAnchorForward(1)
    }
  }
}

function onNonInlineKeydown (event, editor, next) {
  const {value} = editor
  const {anchorText, document, selection} = value
  const {which} = event
  switch (which) {
    case BACKSPACE: {
      const {anchorText} = value
      const inline = document.getPreviousSibling(anchorText.key)
      if (!inline || inline.object !== 'inline') return next()
      if (selection.anchor.offset === 0) {
        const beforeLastChar = inline.text[inline.text.length - 2] || InlineDelimiterConfig[inline.type].startChar
        editor.moveFocusBackward(1).moveAnchorBackward(1).insertText(beforeLastChar)
        return
      }
      next()
    }
    case ARROW_LEFT: {
      const {anchorText} = value
      const inline = document.getPreviousSibling(anchorText.key)
      if (!inline || inline.object !== 'inline') return next()
      if (anchorText.text.length > 0 && selection.anchor.offset === 0) {
        editor.moveTo(inline.key, inline.text.length)
        return
      }
      next()
    }
    default:
      return next()
  }
}


function InlineTextPlugin () {
  return {
    onKeyDown: (event, editor, next) => {
      const {value} = editor
      const {selection, document, focusInline} = value
      if (selection.isExpanded || value.anchorBlock.type !== PARAGRAPH) return next()
      if (focusInline) return onInlineFocusKeyDown(event, editor, next)
      return onNonInlineKeydown(event, editor, next)
    }
  }
}

const plugins = [
  InlineTextPlugin()
]

export default plugins