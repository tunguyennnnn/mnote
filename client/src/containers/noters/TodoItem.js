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
    const { id, category, name, isDone, authorInfo: { canEdit } } = this.props
    
    const { updateName, updateCategory, updateStatus } = this.props
    return (
      <div class='todo-item'>
        <div class='category-container'>
          <IconSelection
            onChange={updateCategory.bind(null, id)}
            options={CategoryOptions}
            currentItem={{ icon: CategoryToIcon[category], category }}
            viewOnly={!canEdit}
          />
        </div>
        <div class='input-container'>
          <InputAndPreview value={name} viewOnly={!canEdit} />
        </div>
      </div>
    )
  }
}