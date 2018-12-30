import {Inline} from 'slate'
import {InlineDelimiterConfig} from './inline-text-plugins'

import {
  INLINE_CODE,
  INLINE_MATH,
  INLINE_QUOTE,
  PARAGRAPH,
  INLINE_KEYWORD,
  INLINE_LINK
} from '../types'

const mapTypeToDefaultText = {}
_.forOwn(InlineDelimiterConfig, (val, key) => {
  mapTypeToDefaultText[key] = val.startChar + val.endChar
})

function InlineHoyKey ({type, key}) {
  return {
    onKeyDown (event, editor, next) {
      const {value} = editor
      if (!event.ctrlKey || event.key !== key) {
        return next()
      }
      if (!(value.blocks.size === 1 && value.startBlock.type === PARAGRAPH)) return next()
      event.preventDefault()
      if (value.inlines.size === 0) {
        const {anchorOffset, focusOffset} = value.selection
        if (anchorOffset === focusOffset) {
          const inline = Inline.fromJSON({
            type,
            nodes: [
              {
                object: 'text',
                leaves: [{object: 'leaf', text: mapTypeToDefaultText[type] || ''}]
              }
            ]
          })
          return editor.insertInline(inline).moveAnchorBackward().moveFocusBackward()
        }
      }
      next()
    }
  }
}

const inlineKeywordHotKey = InlineHoyKey({
  type: INLINE_KEYWORD,
  key: 'k'
})

const inlineQuoteHotKey = InlineHoyKey({
  type: INLINE_QUOTE,
  key: 'q'
})

const inlineMathHotKey = InlineHoyKey({
  type: INLINE_MATH,
  key: 'm'
})

const inlineCodeHotKey = InlineHoyKey({
  type: INLINE_CODE,
  key: 'c'
})

const inlineLinkHotKey = InlineHoyKey({
  type: INLINE_LINK,
  key: 'l'
})

const plugins = [
  inlineKeywordHotKey,
  inlineQuoteHotKey,
  inlineMathHotKey,
  inlineCodeHotKey,
  inlineLinkHotKey
]

export default plugins