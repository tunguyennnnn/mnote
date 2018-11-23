import React from 'react'
import PropTypes from 'prop-types'

import { ThreadEditor } from '../../components'

export default class MyNote extends React.Component {
  static propTypes = {
    node: PropTypes.object
  }

  render () {
    const { node } = this.props
    return (
      <div>
        <ThreadEditor />
      </div>
    )
  }
}
