import { Block } from 'slate'
import { 
  PARAGRAPH,
  TABLE
} from "../types";

export function insertParagraph (editor, node) {
  const { value } = editor
  const { document } = value
  const parent = document.getParent(node.key)
  const index = parent.nodes.findIndex(n => n.key === node.key)
  return editor.insertNodeByKey(parent.key, index + 1, Block.create(PARAGRAPH))
}

export function insertInParagraphBlock (editor, toType, node) {
  const {value} = editor
  const {document} = value
  const parent = document.getParent(node.key)
  const index = parent.nodes.findIndex(n => n.key === node.key)
  console.log(toType)
  const block = toType === TABLE ? makeTableBlock(2, 2) : Block.create(toType)
  if (_.trim(node.text) || toType === PARAGRAPH) {
    return editor.insertNodeByKey(parent.key, index + 1, block)
  }
  return editor.replaceNodeByKey(node.key, block).focus()
}