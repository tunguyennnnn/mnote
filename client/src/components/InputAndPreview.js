import './input-and-preview.scss'
import React from 'react'

export default class InputAndPreview extends React.Component {
  state = {
    showEdit: false
  }

  componentDidUpdate () {
    this.setInputValueAndFocus()
  }

  setInputValueAndFocus = () => {
    if (!this.inputEl) return
    this.inputEl.value = this.props.value
    this.inputEl.focus()
  }

  submitInput = () => {
    if (!this.inputEl) return
    const { value } = this.inputEl
    this.setState({ showEdit: false })
    console.log(value)
  }

  renderEdit () {
    const { value } = this.props
    return (
      <textarea class='input' placeholder='What is your plan?'
             ref={el => this.inputEl = el}
             onBlur={this.submitInput}
      /> 
    )
  }

  showEdit = () => {
    const { viewOnly } = this.props
    if (viewOnly) return
    this.setState({ showEdit: true })
  }

  renderView () {
    const { value } = this.props
    return (
      <p class='content-preview'
        onDoubleClick={this.showEdit}
      >
        {name}
        {!_.trim(value) && 
          <span class='placeholder'>
            What is your plan?
          </span>
        }
      </p>
    )
  }
  render () {
    const { viewOnly } = this.props
    const { showEdit } = this.state
    return (
      <div class='input-and-view-container'>
        {(!viewOnly && showEdit) ? this.renderEdit() : this.renderView()}
      </div>
    )
  }
}