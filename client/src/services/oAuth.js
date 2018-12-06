import Auth0Lock from 'auth0-lock'
import loginOrCreateUser from './auth-helpers/loginOrCreate'

const Configs = {
  clientId: 'n9Yp7wEix6Zg23NETEzGhM9eq2kSj7wT',
  domain: 'oowrite.auth0.com'
}

export const lock = new Auth0Lock(
  Configs.clientId,
  Configs.domain
)

function saveToken (authResult) {
  console.log(authResult)
  const {accessToken, expiresIn, tokenType} = authResult
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('expiresIn', Date.now() + expiresIn * 1000)
  localStorage.setItem('tokenType', tokenType)
}

lock.on('authenticated', (authResult) => {
  console.log(authResult)
  lock.getUserInfo(authResult.accessToken, async (err, profile) => {
    try {
      if (err) {
        console.log(err)
        return
      }
      saveToken(authResult)
      const { sub, email, ...metaData } = profile
      await loginOrCreateUser({ sub, email, metaData })
    } catch (e) { 
      console.log(e)
    }
  })
})

export function isAuthenticated () {
  const {accessToken, expiresIn} = localStorage
  if (!accessToken || !expiresIn) return
  return expiresIn > String(Date.now())
}