import React from 'react'
import isUrl from 'is-url'

import SitePreviewer from '../../SitePreviewer'
import Placeholder from './Placeholder'

export default class LinkBlock extends React.Component {

  render () {
    const { attributes, children, isFocused, node } = this.props
    return (
      <div {...attributes} class='editor-link-block-container'>
        <p {...attributes} class='editor-link-block' >
          <Placeholder node={node} placeholderText='a link...' />
          {children}
        </p>
        {
          !isFocused && isUrl(node.text) && 
          <div contentEditable={false} class='editor-link-preview'>
            <SitePreviewer url={node.text} />
          </div>
        }
      </div>
    )
  }
}