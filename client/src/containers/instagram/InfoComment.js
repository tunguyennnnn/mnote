import React from 'react'
import { Table } from 'semantic-ui-react'

export default class InfoComment extends React.Component {
  render () {
    const { comments } = this.props
    return (
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Comments</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {comments.map(comment => {
            const {text, username} = comment
            return (
              <Table.Row>
                <Table.Cell>
                  {username}
                </Table.Cell>
                <Table.Cell>
                  <p>{text}</p>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}
