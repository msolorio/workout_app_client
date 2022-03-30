import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { Provider } from 'react-redux'
import store from './app/store'
import './index.css';
import App from './App';

const API_ENDPOINT = process?.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000'

console.log('API_ENDPOINT ==>', API_ENDPOINT)

const client = new ApolloClient({
  uri: API_ENDPOINT,
  // uri: 'http://localhost:4000',
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
