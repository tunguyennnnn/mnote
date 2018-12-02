import { Block } from 'slate'
import {
  LIST_ITEM
} from './types'

export function isInList (value) {
  if (value.blocks.size > 1) return false
  const { document, anchorBlock } = value
  const parent = document.getParent(anchorBlock.key)
  return parent.type === LIST_ITEM
}

export function insertListItem (editor) {
  const { value } = editor
  if (!isInList(value)) return
  const { document, anchorBlock } = value
  const listItem = document.getParent(anchorBlock.key)
  const list = document.getParent(listItem.key)
  const index = list.nodes.findIndex(node => node.key === listItem.key)
  const newItem = Block.create({ type: LIST_ITEM })
  return editor.insertNodeByKey(list.key, index + 1, newItem)
}

export function deleteListItem (editor) {
  const { value } = editor
  if (!isInList(value)) return
  const { document, anchorBlock } = value
  const listItem = document.getParent(anchorBlock.key)
  const list = document.getParent(listItem.key)
  if (list.nodes.size === 1) return editor.removeNodeByKey(list.key)
  return editor.removeNodeByKey(listItem.key)
}