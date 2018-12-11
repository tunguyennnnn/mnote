import { Block } from 'slate'

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
  document: {
    nodes: [
      { match: { type: 'title' }, min: 1, max: 1},
      { match: [
          PARAGRAPH, CODE, MATH, ORDERED_LIST, UNORDERED_LIST, TABLE, LINK_BLOCK
        ].map(type => ({ type }))
      , min: 1 },
    ],
    last: { type: PARAGRAPH },
    normalize: (editor, { code, node, child, index }) => {
      console.log(code, index)
      switch (code) {
        case 'child_type_invalid': {
          const type = index === 0 ? TITLE : PARAGRAPH
          return editor.setNodeByKey(child.key, type)
        }
        case 'child_min_invalid': {
          const block = Block.create(index === 0 ? TITLE : PARAGRAPH)
          return editor.insertNodeByKey(node.key, index, block)
        }
        case 'last_child_type_invalid': {
          const paragraph = Block.create(PARAGRAPH)
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    }
  },
  blocks: {
    [CODE]: {
      nodes: [
        {
          match: {type: CODE_LINE},
          min: 1
        }
      ],
      normalize: (change, {code, node, child, index}) => {
        switch (code) {
          case 'child_type_invalid': {
            const block = Block.create(CODE_LINE)
            return change.replaceNodeByKey(child.key, block)
          }
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(CODE_LINE))
          }
        }
      }
    },
    [ORDERED_LIST]: {
      nodes: [
        {match: {type: LIST_ITEM}, min: 1}
      ],
      normalize: (change, {code: reason, node, child, index}) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(LIST_ITEM))
          }
          case 'child_type_invalid': {
            const block = Block.create(LIST_ITEM)
            return change.insertNodeByKey(node.key, index, block)
          }
        }
      }
    },
    [UNORDERED_LIST]: {
      nodes: [
        {match: {type: LIST_ITEM}, min: 1}
      ],
      normalize: (change, {code: reason, node, child, index}) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(LIST_ITEM))
          }
          case 'child_type_invalid': {
            const block = Block.create(LIST_ITEM)
            return change.insertNodeByKey(node.key, index, block)
          }
        }
      }
    },
    [LIST_ITEM]: {
      parent: [{type: UNORDERED_LIST}, {type: ORDERED_LIST}],
      nodes: [
        {
          match: [ORDERED_LIST, UNORDERED_LIST, PARAGRAPH, MATH, LINK_BLOCK].map(type => ({ type })),
          min: 1
        }
      ],
      normalize: (change, {code: reason, node, child, index}) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(PARAGRAPH))
          }
          case 'child_type_invalid': {
            const block = Block.create(PARAGRAPH)
            return change.insertNodeByKey(node.key, index, block)
          }
        }
      }
    },
    [TABLE]: {
      nodes: [
        {match: {type: TABLE_ROW}, min: 1}
      ],
      normalize: (change, {code: reason, node, child, index}) => {
        console.log(reason, child, child.key)
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(TABLE_ROW))
          }
          case 'child_type_invalid': {
            return change.replaceNodeByKey(child.key, Block.create(TABLE_ROW))
          }
        }
      }
    },
    [TABLE_ROW]: {
      parent: {type: TABLE},
      nodes: [
        {match: {type: TABLE_CELL}, min: 1}
      ],
      normalize: (change, {code: reason, node, child, index}) => {
        console.log(reason)
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(TABLE_CELL))
          }
          case 'child_type_invalid': {
            return change.replaceNodeByKey(child.key, Block.create(TABLE_CELL))
          }
        }
      }
    },
    [TABLE_CELL]: {
      parent: [{type: TABLE_ROW}],
      nodes: [
        {
          match: [ORDERED_LIST, UNORDERED_LIST, PARAGRAPH, MATH, LINK_BLOCK].map(type => ({ type })),
          min: 1
        }
      ],
      normalize: (change, {code: reason, node, child, index}) => {
        switch (reason) {
          case 'child_min_invalid': {
            return change.insertNodeByKey(node.key, 0, Block.create(DEFAULT_BLOCK))
          }
          case 'child_type_invalid': {
            const block = Block.create(DEFAULT_BLOCK)
            return change.insertNodeByKey(node.key, index, block)
          }
        }
      }
    }
  }
}
