import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import CreateWorkout from '../pages/CreateWorkout/CreateWorkout'
import IndexWorkout from '../pages/IndexWorkout/IndexWorkout'
import ShowWorkout from '../pages/ShowWorkout/ShowWorkout'
import IndexSession from '../pages/IndexSession/IndexSession'
import ShowSession from '../pages/ShowSession/ShowSession'
import EditWorkout from '../pages/EditWorkout/EditWorkout'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route exact path="/login" render={() => <Login />} />

      <ProtectedRoute exact path="/workouts/create" render={() => <CreateWorkout />} />
      <ProtectedRoute exact path="/workouts/:workoutId" render={(props: any) => <ShowWorkout {...props} />} />
      <ProtectedRoute exact path="/workouts/:workoutId/edit" render={(props: any) => <EditWorkout {...props} />} />
      <ProtectedRoute path="/workouts" render={() => <IndexWorkout />} />
      <ProtectedRoute path="/sessions/:sessionId" render={(props: any) => <ShowSession {...props} />} />
      <ProtectedRoute path="/sessions" render={() => <IndexSession />} />

      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default Routes
