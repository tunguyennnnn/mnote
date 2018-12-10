import React from 'react'
import { Image, Label } from 'semantic-ui-react'

export default class NoteAuthor extends React.Component {
  render () {
    const { author } = this.props
    const { metaData: { nickname, picture }} = author
    return (
      <span>
        <Image src={picture} bordered avatar />
        <Label as='a' tag>
          { nickname }
        </Label>
      </span>
    )
  }
}