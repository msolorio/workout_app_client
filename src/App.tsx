import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout'
import IndexWorkout from './pages/IndexWorkout/IndexWorkout'
import ShowWorkout from './pages/ShowWorkout/ShowWorkout'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Workout App</h1>
      <Header />
      <Switch>
        <Route exact path="/workouts" render={() => <IndexWorkout />} />
        <Route exact path="/workouts/create" render={() => <CreateWorkout />} />
        <Route exact path="/workouts/:workoutId" render={(props) => <ShowWorkout {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
