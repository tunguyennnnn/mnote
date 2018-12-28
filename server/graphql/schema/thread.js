export default `
  type Thread {
    id: Int!
    title: String!
    detail: JSON!
    authorInfo: ThreadAuthorInfo!
    updatedAt: String!
  }

  type ThreadAuthorInfo {
    authorizationInfo: AuthorizationInfo!
    author: User
  }

  type ThreadConnectionEdge {
    cursor: String!
    node: Thread!
  }

  type ThreadConnection {
    pageInfo: PageInfo!
    edges: [ThreadConnectionEdge!]!
  }

  type Query {
    thread (id: ID!): Thread
    threads (cursor: String, limit: Int = 20): ThreadConnection!
    userThreads (userId: ID!, cursor: String, limit: Int = 20): ThreadConnection!
  }

  type Mutation {
    createThread: Thread
    updateThread (id: ID!, detail: JSON! = []): Thread
    deleteThread (id: ID!): Boolean
  }
`
