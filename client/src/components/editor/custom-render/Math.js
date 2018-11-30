import React from 'react'

export default class Math extends React.Component {
  render () {
    const { attributes, children } = this.props
    return (
      <div {...attributes}>{children}</div>
    )
  }
}