import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'

const loginOrSignupMutation = gql`
  mutation loginOrSignup ($sub: String!, $email: String!, $metaData: JSON!) {
    user: loginOrSignup (sub: $sub, email: $email, metaData: $metaData) {
      id
    }
  }
`
export default async function loginOrCreateUser ({ sub, email, metaData }) {
  try {
    const client = new GraphQLClient('/graphql')
    const response = await client.request(loginOrSignupMutation, { sub, email, metaData })
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}