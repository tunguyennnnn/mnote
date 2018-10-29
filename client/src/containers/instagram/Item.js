import React from 'react'
import { List, Image } from 'semantic-ui-react'

export default class Item extends React.Component {
  render () {
    const { url, name, description, handleClick } = this.props
    return (
      <List.Item as='a' onClick={handleClick} >
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
