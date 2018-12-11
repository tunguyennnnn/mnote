export default `
  scalar JSON
  scalar Upload
  scalar Date

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type AuthorizationInfo {
    canView: Boolean!
    canEdit: Boolean!
  }
`
