import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import TodoItem from './TodoItem'

class CheckList extends React.Component {

  onUpdateItem = (itemId, { key, value }, proxy, { data: { updateResult }}) => {

  }

  updateName = async (itemId, value) => {
    try {
      
    } catch (e) {
      console.log(e)
    }
  }


  updateCategory = async (itemId, value) => {
    console.log(itemId, value)
  }

  updateStatus = async (itemId, value) => {
    console.log(itemId, value)
  }

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
           todoItems.map(({ cursor, node}) => 
            <TodoItem {...node} 
                      key={`todo-item-${cursor}`} 
                      updateName={this.updateName}
                      updateCategory={this.updateCategory}
                      updateStatus={this.updateStatus}
                      />
           )
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

const todoFields = gql`
  fragment TodoFileds on TodoItem {
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
`

const todoItemQuery = gql`
  query userTodoItems ($userId: ID!) {
    userTodoItems (userId: $userId) {
      authorInfo {
        canEdit
      }
      edges {
        cursor
        node {
          ...TodoFileds
        }
      }
    }
  }
  ${todoFields}
`

const createTodoItem = gql`
  mutation createTodoItem {
    newItem: createTodoItem {
      ...TodoFileds
    }
  }
  ${todoFields}
`

const updateCategory = gql`
  mutation updateTodoItemCategory ($id: ID!, $category: String!) {
    result: updateTodoItemCategory (id: $id, category: $category) {
      newItem {
        ...TodoFileds
      }
      updateResult {
        updated
        error
      }
    }
  }
  ${todoFields}
`

const updateName = gql`
  mutation updateTodoItemName ($id: ID!, $name: String!) {
    result: updateTodoItemName (id: $id, name: $name) {
      newItem {
        ...TodoFileds
      }
      updateResult {
        updated
        error
      }
    }
  }
  ${todoFields}
`

const updateStatus = gql`
  mutation updateTodoItemStatus ($id: ID!, $isDone: Boolean!) {
    result: updateTodoItemStatus (id: $id, isDone: $isDone) {
      newItem {
        ...TodoFileds
      }
      updateResult {
        updated
        error
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
  graphql(createTodoItem, { name: 'createTodoItem' }),
  graphql(updateCategory, { name: 'updateCategory' }),
  graphql(updateName, { name: 'updateName' })
)(CheckList)