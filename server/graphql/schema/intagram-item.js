export default `
  type InstagramItemInfoEdge {
    cursor: String!
    node: InstagramInfo!
  }

  type InstagramItemInfoConnection {
    pageInfo: PageInfo!
    edges: [InstagramItemInfoEdge!]
  }

  type InstagramItem {
    id: ID!
    url: String!
    name: String!
    infoConnection (cursor: String, limit: Int = 2): InstagramItemInfoConnection!
  }

  type InstagramItemEdge {
    node: InstagramItem!
    cursor: String!
  }

  type InstagramItemConnection {
    pageInfo: PageInfo!
    edges: [InstagramItemEdge!]
  }

  type Query {
    instagramItems (cursor: String, limit: Int = 10): InstagramItemConnection
    instagramItem (id: ID!): InstagramItem
  }

  type Mutation {
    createInstagramItem (url: String!, name: String = "No Title", description: String = "No Description"): InstagramItem
  }
`
