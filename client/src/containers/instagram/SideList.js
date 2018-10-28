import React from 'react'
import { Header, Input} from 'semantic-ui-react'

import ItemList from './ItemList'

export default class SideList  extends React.Component {
  render () {
    return (
      <div>
        <Header as='h2'>List of Instagram Profiles</Header>
        <Input fluid placeholder='Search...' />
        <ItemList />
      </div>
    )
  }
}
