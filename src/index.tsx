import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { Provider } from 'react-redux'
import store from './model/services/redux/reduxApi/app/store'
import './assets/css/index.css'
import App from './App/App'
import './assets/fonts/Ubuntu-Regular.ttf'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache({
    addTypename: false
  })
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
