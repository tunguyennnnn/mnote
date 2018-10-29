import React from 'react'
import InfoList from './InfoList'

export default class RightSide extends React.Component {
  render () {
    const {activeItem} = this.props

    return (
      <div>
        {activeItem && <InfoList activeItem={activeItem} />}
      </div>
    )
  }
}
