import AutoReplace from 'slate-auto-replace'

import onBackspaceInCodeline from './on-backspace-in-code-line'
import hotkeyPlugins from './hotkey-plugins'
import inlineTextPlugins from './inline-text-plugins'

const onTabReplace = AutoReplace({
  trigger: 'tab',
  before: /.*/,
  change (editor, e, matches) {
    return editor.insertText('  ')
  }
})

export default [
  onTabReplace,
  onBackspaceInCodeline,
  ...hotkeyPlugins,
  ...inlineTextPlugins
]