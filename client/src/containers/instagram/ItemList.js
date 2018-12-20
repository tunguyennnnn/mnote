import React from 'react'
import { Image, List, Button } from 'semantic-ui-react'

import Item from './Item'

export default class ItemList extends React.Component {
  render () {
    const { items, setItem, deleteInstagramItem } = this.props
    return (
      <List celled link>
        {items.map(item => <Item {...item.node} handleClick={() => setItem(item.node)} deleteInstagramItem={deleteInstagramItem} />)}
      </List>
    )
  }
}
