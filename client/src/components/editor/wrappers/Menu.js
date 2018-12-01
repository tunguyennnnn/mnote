import React from 'react'
import { Icon } from 'semantic-ui-react'

export default class Menu extends React.Component {
  render () {
    const { actionList, handleClick } = this.props
    return (
      <div class='menu-container'>
        {
          actionList.map(({ type, icon }) => 
            <Icon key={`${type}-${icon}`} name={icon} link onClick={handleClick.bind(null, type)} />
          )
        }
      </div>
    )
  }
}