import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class NewItemForm extends React.Component {
  submit = () => {
    const url = this.urlInputEl.value
    const name = this.titleInputEl.value
    const description = this.descriptionInputEl.value
    this.props.submit({ url, name, description })
    this.props.closeModal()
  }

  render () {
    return (
      <div>
        <Form>
          <Form.Field onSubmit={this.submit}>
            <label>Url</label>
            <input ref={(el) => this.urlInputEl = el} placeholder='Url...' />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <input ref={(el) => this.titleInputEl = el} placeholder='Name...' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <textarea ref={(el) => this.descriptionInputEl = el} placeholder='Description...' />
          </Form.Field>
          <Button type='submit' onClick={this.submit}>Submit</Button>
        </Form>
      </div>
    )
  }
}
