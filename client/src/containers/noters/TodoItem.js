import React from 'react'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

const CategoryToIcon = {
  RANDOM: 'pencil',
  BOOK: 'book',
  VIDEO: 'video play',
  ARTICLE: 'file outline'
}

export default class TodoItem extends React.Component {
  render () {
    const { category, name, isDone } = this.props
    return (
      <div class='todo-item'>
        <span class='category'>
          <Icon name={CategoryToIcon[category]} link />
        </span>
        <p class='content'>
          {name}
          {!_.trim(name) && 
            <span class='placeholder'>
              What is your plan?
            </span>
          }
        </p>
      </div>
    )
  }
}