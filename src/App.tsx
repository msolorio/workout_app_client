import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout'
import IndexWorkout from './pages/IndexWorkout/IndexWorkout'
import ShowWorkout from './pages/ShowWorkout/ShowWorkout'
import IndexSession from './pages/IndexSession/IndexSession'
import ShowSession from './pages/ShowSession/ShowSession'
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
        <Route exact path="/sessions" render={() => <IndexSession />} />
        <Route exact path="/sessions/:sessionId" render={(props) => <ShowSession {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
