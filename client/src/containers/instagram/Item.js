import React from 'react'
import { List, Image, Icon } from 'semantic-ui-react'

export default class Item extends React.Component {
  render () {
    const { id, url, name, description, handleClick, deleteInstagramItem } = this.props
    return (
      <List.Item as='a' onClick={handleClick} style={{position: 'relative'}} >
        <Icon name='trash' link style={{position: 'absolute', top: 2, right: 2}}
          onClick={() => deleteInstagramItem({ id })}
        />
        <List.Content>
          <List.Header as='a'>{name}</List.Header>
          <List.Description>
            {description}
          </List.Description>
        </List.Content>
        <a href={url}>
          link
        </a>
      </List.Item>
    )
  }
}
