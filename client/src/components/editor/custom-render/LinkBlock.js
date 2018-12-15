import React from 'react'
import isUrl from 'is-url'

import SitePreviewer from '../../SitePreviewer'

export default class LinkBlock extends React.Component {

  render () {
    const { attributes, children, isFocused, node } = this.props
    return (
      <div {...attributes} class='editor-link-block'>
        <p {...attributes}>{children}</p>
        {
          !isFocused && isUrl(node.text) && <SitePreviewer url={node.text} />
        }
      </div>
    )
  }
}