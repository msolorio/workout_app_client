import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import apolloClient from './apolloClient'
import store from './model/services/redux/reduxApi/app/store'
import './assets/css/index.css'
import App from './App'
import './assets/fonts/Ubuntu-Regular.ttf'


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
