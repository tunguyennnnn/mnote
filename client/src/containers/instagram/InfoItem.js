import React from 'react'
import { List, Image, Label, Table } from 'semantic-ui-react'

import InfoComment from './InfoComment'

export default class InfoItem extends React.Component {
  render () {
    const { image, id, title, numberOfLikes, numberOfComments, comments } = this.props
    return (
      <List.Item>
        <Image src={image} bordered avatar />
        <List.Content>
          <List.Content>
            <List.Header>{numberOfLikes} likes - {numberOfComments} comments</List.Header>
          </List.Content>
        </List.Content>
        <List.Content>
          <InfoComment comments={comments} />
        </List.Content>
      </List.Item>
    )
  }
}
