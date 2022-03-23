import { Switch, Route, Redirect } from 'react-router-dom';
import { useAppSelector } from './app/hooks'
import { selectLoginTokenInRdx } from './features/auth/authSlice';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout'
import IndexWorkout from './pages/IndexWorkout/IndexWorkout'
import ShowWorkout from './pages/ShowWorkout/ShowWorkout'
import IndexSession from './pages/IndexSession/IndexSession'
import ShowSession from './pages/ShowSession/ShowSession'
import EditWorkout from './pages/EditWorkout/EditWorkout'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

function Routes() {
  const loginToken: string = useAppSelector(selectLoginTokenInRdx)

  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route exact path="/login" render={() => <Login />} />

      { loginToken && <Route exact path="/workouts" render={() => <IndexWorkout />} /> }
      { loginToken && <Route exact path="/workouts/create" render={() => <CreateWorkout />} /> }
      { loginToken && <Route exact path="/workouts/:workoutId" render={(props) => <ShowWorkout {...props} />} /> }
      { loginToken && <Route exact path="/workouts/:workoutId/edit" render={(props) => <EditWorkout {...props} />} /> }
      { loginToken && <Route exact path="/sessions" render={() => <IndexSession />} /> }
      { loginToken && <Route exact path="/sessions/:sessionId" render={(props) => <ShowSession {...props} />} /> }

      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default Routes
