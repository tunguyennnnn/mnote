import Auth0Lock from 'auth0-lock'
import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'

const Configs = {
  clientId: 'n9Yp7wEix6Zg23NETEzGhM9eq2kSj7wT',
  domain: 'oowrite.auth0.com'
}

const loginOrSignupMutation = gql`
  mutation loginOrSignup ($sub: String!, $email: String!, $metaData: JSON!) {
    user: loginOrSignup (sub: $sub, email: $email, metaData: $metaData) {
      id
    }
  }
`

export async function loginOrCreateUser ({ sub, email, metaData }) {
  try {
    const client = new GraphQLClient('/graphql')
    const response = await client.request(loginOrSignupMutation, { sub, email, metaData })
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

export const lock = new Auth0Lock(
  Configs.clientId,
  Configs.domain
)

export function saveToken (authResult) {
  console.log(authResult)
  const {accessToken, expiresIn, tokenType} = authResult
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('expiresIn', Date.now() + expiresIn * 1000)
  localStorage.setItem('tokenType', tokenType)
}


export function isAuthenticated () {
  const {accessToken, expiresIn} = localStorage
  if (!accessToken || !expiresIn) return
  return expiresIn > String(Date.now())
}