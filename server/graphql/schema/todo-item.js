export default `
  type TodoItem {
    id: ID!
    name: String!
    category: String!
    isDone: Boolean!
    thread: Thread
    authorInfo: AuthorizationInfo!
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
    updateTodoItemCategory (id: ID!, category: String!): UpdatedResult!
    updateTodoItemName (id: ID!, name: String!): UpdatedResult!
    updateTodoItemStatus (id: ID!, isDone: Boolean!): UpdatedResult!
    deleteTodoItem (id: ID!): Boolean!
    createTodoItemThread (todoItemId: ID!): Thread
  }
`