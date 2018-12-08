import Auth0Lock from 'auth0-lock'
import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'

const Configs = {
  clientId: 'n9Yp7wEix6Zg23NETEzGhM9eq2kSj7wT',
  domain: 'oowrite.auth0.com',
  options: {
    auth: {
      responseType: "token id_token",
    }
  }
}

const UserKeys = [
  'userId', 'email', 'name', 'nickname', 'picture', 'accessToken', 'expiresIn', 'idToken'
]

const loginOrSignupMutation = gql`
  mutation loginOrSignup ($sub: String!, $email: String!, $metaData: JSON!, $idToken: String!) {
    user: loginOrSignup (sub: $sub, email: $email, metaData: $metaData, idToken: $idToken) {
      id
    }
  }
`

export async function loginOrCreateUser ({ sub, email, metaData, idToken }) {
  try {
    const client = new GraphQLClient('/graphql')
    const response = await client.request(loginOrSignupMutation, { sub, email, metaData, idToken })
    const { user: { id: userId }} = response
    const { name, nickname, picture } = metaData
    localStorage.setItem('userId', userId)
    localStorage.setItem('email', email)
    localStorage.setItem('name', name)
    localStorage.setItem('nickname', nickname)
    localStorage.setItem('picture', picture)
  } catch (e) {
    console.log(e)
  }
}

export const lock = new Auth0Lock(
  Configs.clientId,
  Configs.domain,
  Configs.options
)

export async function saveToken (authResult) {
  const { accessToken, expiresIn, idToken, idTokenPayload } = authResult
  try {
    const { sub, email, ...metaData } = idTokenPayload
    await loginOrCreateUser({ sub, email, metaData, idToken })
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('expiresIn', Date.now() + expiresIn * 1000)
    localStorage.setItem('idToken', idToken)
  } catch (e) {
    throw e
  }
}

export function userProfile () {
  const { userId, email, name, nickname, picture } = localStorage
  return { userId, email, name, nickname, picture }
}


export function isAuthenticated () {
  const { idToken, expiresIn } = localStorage
  if (!idToken || !expiresIn) return
  return expiresIn > String(Date.now())
}

export function logout () {
  UserKeys.forEach(key => localStorage.removeItem(key))
}