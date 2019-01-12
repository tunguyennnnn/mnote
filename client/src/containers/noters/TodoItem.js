import React from 'react'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

import { IconSelection, InputAndPreview } from '../../components'

const CategoryToIcon = {
  RANDOM: 'pencil',
  BOOK: 'book',
  VIDEO: 'video play',
  ARTICLE: 'file outline'
}

const CategoryOptions = _.keys(CategoryToIcon).map(k => {
  return { key: k.toLowerCase(), icon: CategoryToIcon[k], value: k }
})

export default class TodoItem extends React.Component {
  render () {
    const { category, name, isDone, authorInfo: { canEdit } } = this.props
    return (
      <div class='todo-item'>
        <span class='category'>
          <IconSelection 
            options={CategoryOptions}
            currentItem={{ icon: CategoryToIcon[category], category }}
            viewOnly={!canEdit}
          />
        </span>
        <span>
          <InputAndPreview value={name} viewOnly={!canEdit} />
        </span>
      </div>
    )
  }
}