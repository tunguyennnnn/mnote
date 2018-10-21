export default `
  type Topic {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    topic (id: ID!): Topic
    topics (limit: Int, cursor: String): [Topic]
  }

  type Mutation {
    createTopic (name: String!): Topic
  }
`
