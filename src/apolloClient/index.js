import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import API_ENDPOINT from '../utils/API_ENDPOINT'

const link = createHttpLink({
  uri: API_ENDPOINT,
  credentials: 'include'
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default apolloClient
