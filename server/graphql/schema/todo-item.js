export default `
  type TodoItem {
    id: ID!
    name: String!
    category: String!
    isDone: Boolean!
    thread: Thread
    authorInfo: AuthorizationInfo!
  }

  type Query {
    userTodoItems (userId: ID!): [TodoItem!]
  }

  type Mutation {
    createTodoItem (userId: ID!, category: String!, name: String!): TodoItem!
    updateTodoItemCategory (id: ID!, category: String!): UpdatedResult!
    updateTodoItemName (id: ID!, name: String!): UpdatedResult!
    updateTodoItemStatus (id: ID!, isDone: Boolean!): UpdatedResult!
    deleteTodoItem (id: ID!): Boolean!
    createTodoItemThread (todoItemId: ID!): Thread
  }
`