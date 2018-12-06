export default `
  type User {
    id: ID!
    sub: String!
    email: String!
    metaData: JSON!
  }

  type Query {
    user (id: ID!): User
  }

  type Mutation {
    loginOrSignup (sub: String!, email: String!, metaData: JSON!): User
  }
`