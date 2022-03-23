import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout'
import IndexWorkout from './pages/IndexWorkout/IndexWorkout'
import ShowWorkout from './pages/ShowWorkout/ShowWorkout'
import IndexSession from './pages/IndexSession/IndexSession'
import ShowSession from './pages/ShowSession/ShowSession'
import EditWorkout from './pages/EditWorkout/EditWorkout'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Workout App</h1>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/login" render={() => <Login />} />

        <Route exact path="/workouts" render={() => <IndexWorkout />} />
        <Route exact path="/workouts/create" render={() => <CreateWorkout />} />
        <Route exact path="/workouts/:workoutId" render={(props) => <ShowWorkout {...props} />} />
        <Route exact path="/workouts/:workoutId/edit" render={(props) => <EditWorkout {...props} />} />
        <Route exact path="/sessions" render={() => <IndexSession />} />
        <Route exact path="/sessions/:sessionId" render={(props) => <ShowSession {...props} />} />

        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
