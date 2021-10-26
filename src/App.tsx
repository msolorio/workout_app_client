import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout';
import IndexWorkout from './pages/IndexWorkout';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Workout App</h1>
      <Header />
      <Switch>
        <Route path="/workouts/create" render={() => <CreateWorkout />} />
        <Route path="/workouts" render={() => <IndexWorkout />} />
      </Switch>
    </div>
  );
}

export default App;
