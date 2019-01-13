import './icon-selection.scss'
import React from 'react'
import { Icon, List } from 'semantic-ui-react'

export default class IconSelection extends React.Component {
  state = {
    showMenu: false
  }

  toggleMenu = () => {
    const { showMenu } = this.state
    this.setState({ showMenu: !showMenu })
  }

  hideMenu = () => {
    this.setState({ showMenu: false })
  }

  onSelect = (value, event) => {
    event.preventDefault()
    this.setState({ showMenu: false })
    this.props.onChange(value)
  }

  renderMenu () {
    const { options } = this.props
    return (
      <div class='selection-container'
        onMouseLeave={this.hideMenu}
      >
        <List animated verticalAlign='middle'>
          {
            options.map(option => {
              const { key, icon, value } = option
              return (
                <List.Item className='selection-item'
                  onClick={this.onSelect.bind(this, value)}
                >
                  <Icon name={icon} link />
                  <List.Content>
                    <List.Header>{key}</List.Header>
                  </List.Content>
                </List.Item>
              )
            })
          }
        </List>
      </div>
    )
  }


  renderIcon () {
    const { viewOnly, currentItem: { icon, category = '' } } = this.props
    if (viewOnly) {
      return (
        <div class='icon-container'>
          <span>{category.toLowerCase()}</span>
          <Icon name={icon} link />
        </div>
      )
    }

    return (
      <div class='icon-container' onClick={this.toggleMenu}>
        <Icon name={icon} link circular />
      </div>
    )
  }

  render () {
    const { viewOnly } = this.props
    const { showMenu } = this.state
    return (
      <div class='icon-selection-container'>
        {this.renderIcon()}
        {!viewOnly && showMenu && this.renderMenu()}
      </div>
    )
  }
}