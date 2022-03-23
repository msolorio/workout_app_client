import React, { useState } from 'react';
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
import { setLoginToken, removeLoginToken } from './utils/authUtils'
import './App.css'

function App() {

  // TODO: Move these methods to the child components ////////////////////////////
  const setSessionToken = (token: string) => {
    setLoginToken(token)
  }

  const removeSessionToken = () => {
    removeLoginToken()
  }

  return (
    <div className="App">
      <h1>Workout App</h1>
      <Header removeSessionToken={removeSessionToken} />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/login" render={() => <Login setSessionToken={setSessionToken} />} />

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
