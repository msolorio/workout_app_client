import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from './app/hooks'
import { storeWorkouts } from './features/workouts/workoutsSlice'

import Header from './components/Header';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout'
import IndexWorkout from './pages/IndexWorkout/IndexWorkout'
import ShowWorkout from './pages/ShowWorkout/ShowWorkout'
import './App.css'

import {
  useQuery,
  gql
} from '@apollo/client';

const WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      name
      description
      length
      location
    }
  }
`;

function App() {
  const dispatch = useAppDispatch()
  const loadWorkoutStatus = useAppSelector((state) => state.workouts.status)

  const { loading, error, data } = useQuery(WORKOUTS)

  if (loading) return <h2>Loading...</h2>

  if (error) {
    console.log(error)
    return <h2>Error</h2>
  }
  
  if (data && loadWorkoutStatus !== 'succeeded') {
    dispatch(storeWorkouts(data.workouts))
  }

  return (
    <div className="App">
      <h1>Workout App</h1>
      <Header />
      <Switch>
        <Route exact path="/workouts" render={() => <IndexWorkout />} />
        <Route exact path="/workouts/create" render={() => <CreateWorkout />} />
        <Route exact path="/workouts/:workoutId" component={ShowWorkout} />
      </Switch>
    </div>
  );
}

export default App;
