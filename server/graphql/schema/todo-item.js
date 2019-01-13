export default `
  type TodoItem {
    id: ID!
    name: String!
    category: String!
    isDone: Boolean!
    thread: Thread
    authorInfo: AuthorizationInfo!
  }

  type TodoItemUpdateResult {
    updateResult: UpdatedResult!
    newItem: TodoItem
  }

  type TodoItemConnectionEdge {
    cursor: String!
    node: TodoItem!
  }

  type TodoItemConnection {
    authorInfo: AuthorizationInfo!
    pageInfo: PageInfo!
    edges: [TodoItemConnectionEdge!]!
  }

  type Query {
    userTodoItems (userId: ID!): TodoItemConnection!
  }

  type Mutation {
    createTodoItem: TodoItem!
    updateTodoItemCategory (id: ID!, category: String!): TodoItemUpdateResult!
    updateTodoItemName (id: ID!, name: String!): TodoItemUpdateResult!
    updateTodoItemStatus (id: ID!, isDone: Boolean!): TodoItemUpdateResult!
    deleteTodoItem (id: ID!): Boolean!
    createTodoItemThread (todoItemId: ID!): Thread
  }
`