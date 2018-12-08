import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('idToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: '/graphql' })),
  cache: new InMemoryCache()
})

export default client
