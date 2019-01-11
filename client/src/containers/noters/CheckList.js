import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import TodoItem from './TodoItem'

class CheckList extends React.Component {
  createTodoItem = async (event) => {
    event.preventDefault()
    const { userId } = this.props
    try {
      await this.props.createTodoItem({
        variables: {},
        update: (proxy, { data: { newItem } }) => {
          try {
            const data = proxy.readQuery({ query: todoItemQuery, variables: { userId } })
  
            data.userTodoItems.edges = [
              { cursor: newItem.createdAt, node: newItem, __typename: "TodoItemConnectionEdge" },
              ...data.userTodoItems.edges
            ]
            proxy.writeQuery({ query: todoItemQuery, data, variables: { userId } })
          } catch (e) {
            console.log(e)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const { data } = this.props
    if (data.loading) return <div>...loading</div>
    if (data.error) return <div>error</div>
    console.log(data)
    const { authorInfo: { canEdit }, edges: todoItems } = data.userTodoItems
    return (
      <div class='checklist-container'>
        <div class='checklist-header'>
          Plan List
        </div>
        <div class='checklist'>
         {
           todoItems.map(({ cursor, node}) => <TodoItem {...node} key={`todo-item-${cursor}`} />)
         }
        </div>
        { canEdit && 
          <div class='checklist-action'>
            <button type='button' onClick={this.createTodoItem}>
              Create Item
            </button>
          </div>
        }
      </div>
    )
  }
}

const todoItemQuery = gql`
  query userTodoItems ($userId: ID!) {
    userTodoItems (userId: $userId) {
      authorInfo {
        canEdit
      }
      edges {
        cursor
        node {
          id
          name
          category
          isDone
          thread {
            id
          }
          authorInfo {
            canEdit
          }
        }
      }
    }
  }
`

const createTodoItem = gql`
  mutation createTodoItem {
    newItem: createTodoItem {
      id
      name
      category
      isDone
      thread {
        id
      }
      authorInfo {
        canEdit
      }
    }
  }
`

export default compose(
  graphql(todoItemQuery, {
    options: (props) => {
      return {
        variables: {
          userId: props.userId
        }
      }
    }
  }),
  graphql(createTodoItem, { name: 'createTodoItem' })
)(CheckList)