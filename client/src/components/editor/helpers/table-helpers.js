import * as _ from 'lodash'
import { Block } from 'slate'

import {
  TABLE,
  PARAGRAPH,
  TABLE_ROW,
  TABLE_CELL
} from './types'

export function makeTableBlock (row = 2, column = 2) {
  const columns = _.range(0, column).map(i =>
    ({
      object: 'block',
      type: TABLE_CELL,
      nodes: [{ type: PARAGRAPH, object: 'block' }]
    })
  )

  const rows = _.range(0, row).map(i =>
    ({
      object: 'block',
      type: TABLE_ROW,
      nodes: columns
    })
  )

  return Block.fromJSON({
    object: 'block',
    type: TABLE,
    nodes: rows
  })
}

export function isInTable (value) {
  if (value.blocks.size > 1) return false
  const { document, anchorBlock } = value
  const ancestors = document.getAncestors(anchorBlock.key)
  return ancestors.some(p => p.type === TABLE)
}

export function insertTableRow (editor) {
  const { value } = editor
  if (!isInTable(value)) return
  const { document, anchorBlock } = value
  const [table, row] = document.getAncestors(anchorBlock.key)
    .filter(p => p.type === TABLE_ROW || p.type === TABLE);
  if (!table || !row) return
  const index = table.nodes.findIndex(n => n.key === row.key)
  const numberOfCells = table.nodes.first().nodes.size
  const block = Block.fromJSON({
    type: TABLE_ROW,
    nodes: _.range(0, numberOfCells).map(i => ({ type: TABLE_CELL, object: 'block' }))
  })
  return editor.insertNodeByKey(table.key, index + 1, block)
}

export function removeTableRow (editor) {
  const { value } = editor
  if (!isInTable(value)) return
  const { document, anchorBlock } = value
  const [table, row] = document.getAncestors(anchorBlock.key)
    .filter(p => p.type === TABLE_ROW || p.type === TABLE);
  if (!table || !row) return
  if (table.nodes.size === 1) return editor.removeNodeByKey(table.key)
  return editor.removeNodeByKey(row.key)
}

export function insertTableColumn (editor) {
  const { value } = editor
  if (!isInTable(value)) return
  const { anchorBlock, document } = value
  const [table, row, cell] = document.getAncestors(anchorBlock.key)
    .filter(p => p.type === TABLE_CELL || p.type === TABLE_ROW || p.type === TABLE);
  if (!table || !row || !cell) return
  const cellIndex = row.nodes.findIndex(node => node.key === cell.key)
  const tableRows = table.nodes
  const cellBlock = Block.create({
    type: TABLE_CELL,
    object: 'block'
  })
  for (const row of tableRows) {
    editor.insertNodeByKey(row.key, cellIndex + 1, cellBlock)
  }
}

export function removeTableColumn (editor) {
  const { value } = editor
  if (!isInTable(value)) return
  const { anchorBlock, document } = value
  const [table, row, cell] = document.getAncestors(anchorBlock.key)
    .filter(p => p.type === TABLE_CELL || p.type === TABLE_ROW || p.type === TABLE);
  const cellIndex = row.nodes.findIndex(node => node.key === cell.key)
  const tableRows = table.nodes
  const cellBlock = Block.create({
    type: TABLE_CELL,
    object: 'block'
  })
  for (const row of tableRows) {
    const cellAtIndex = row.nodes.get(cellIndex)
    if (cellAtIndex) editor.removeNodeByKey(cellAtIndex.key)
  }
}