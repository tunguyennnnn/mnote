import React from 'react'
import { Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NoteAuthor extends React.Component {
  render () {
    const { author } = this.props
    const { id, metaData: { nickname, picture }} = author
    return (
      <span>
        <Image src={picture} bordered avatar />
        <Label as='span' tag>
          <Link to={{
            pathname: `/noters/${id}`
          }}
          >
            { nickname }
          </Link>
        </Label>
      </span>
    )
  }
}