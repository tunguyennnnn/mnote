import React from 'react'

export default function hoverComponent (Component) {
  return class extends React.Component {
    state = {
      isHoverred: false
    }

    render () {
      return (
        <span
          onMouseEnter={() => this.setState({ isHoverred: true })}
          onMouseLeave={() => this.setState({ isHoverred: false })}
        >
          <Component isHoverred={this.state.isHoverred} {...this.props} />
        </span>
      )
    }
  }
}
