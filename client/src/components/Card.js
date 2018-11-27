import './card.scss'
import React from 'react'

export default class Card extends React.Component {
  render () {
    const { type, title, description = [], technologies, time, link } = this.props
    return (
      <div class='card-container'>
        <p class='card-title'><strong>{type} - {title}</strong></p>
        {
          description.map(d => <p class='card-description'>{d}</p>)
        }
        {
          technologies &&
          <p class='card-technology'><strong class='highlight'>Technologies: </strong>{technologies}</p>
        }
        {time && <p class='card-time'><strong class='highlight'>When: </strong> {time}</p>}
        {link && <strong><a href={link} target='_blank'>link to project</a></strong>}
      </div>
    )
  }
}
