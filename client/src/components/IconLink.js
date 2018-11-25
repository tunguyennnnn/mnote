import React from 'react'
import { Icon } from 'semantic-ui-react'

import hoverComponent from './hoverComponent'

@hoverComponent
export default class IconLink extends React.Component {
  render () {
    const { name, isHoverred, link } = this.props
    console.log(name, isHoverred, link)
    return (
      <a href={link} target='_blank'>
        <Icon name={name} link size={!isHoverred ? 'large' : 'huge'} />
      </a>
    )
  }
}
