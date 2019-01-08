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
    updateTodoItemCategory (id: ID!, category: String!): Boolean!
    updateTodoItemName (id: ID!, name: String!): Boolean!
    updateTodoItemStatus (id: ID!, isDone: Boolean!): Boolean!
    createTodoItemThread (todoItemId: ID!): Thread
  }
`