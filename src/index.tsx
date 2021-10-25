import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      date
      description
      length
      location
      sets {
        id
        exercise
        reps
      }
    }
  }
`;

function Workouts() {
  const { loading, error, data } = useQuery(WORKOUTS);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return data.workouts.map((workout: any, idx: number) => {
    return (
      <div key={idx}>
        <h2>{workout.date}</h2>
        <p>{workout.description}</p>
      </div>
    );
  });
}


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Workouts />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
