import _ from 'lodash'

import { 
  CODE_LINE
} from '../types'

const BACKSPACE = 8

export default {
  onKeyDown (event, editor, next) {
    const { which } = event
    const { value } = editor
    if ( value.blocks.size > 1 || value.anchorBlock.type !==  CODE_LINE) return next()
    const { document, anchorBlock } = value
    const codeBlock = document.getParent(anchorBlock.key)
    if (which === BACKSPACE && codeBlock.nodes.size === 1 && !anchorBlock.text) {
      event.preventDefault()
      return editor.removeNodeByKey(codeBlock.key)
    }
    next()
  }
}