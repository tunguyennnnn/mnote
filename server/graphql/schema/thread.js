export default `
  type Thread {
    id: Int!
    title: String!
    detail: JSON!
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
    threads (cursor: String, limit: Int = 20): ThreadConnection!
  }

  type Mutation {
    createThread: Thread
    updateThread (id: ID!, detail: JSON! = []): Thread
  }
`