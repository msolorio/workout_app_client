import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import CreateWorkout from '../pages/CreateWorkout'
import IndexWorkout from '../pages/IndexWorkout'
import ShowWorkout from '../pages/ShowWorkout'
import IndexSession from '../pages/IndexSession'
import ShowSession from '../pages/ShowSession'
import EditWorkout from '../pages/EditWorkout'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home/Home'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route exact path="/login" render={() => <Login />} />

      <ProtectedRoute path="/workouts/create" render={() => <CreateWorkout />} />
      <ProtectedRoute path="/workouts/:workoutId/edit" render={(props: any) => <EditWorkout {...props} />} />
      <ProtectedRoute path="/workouts/:workoutId" render={(props: any) => <ShowWorkout {...props} />} />
      <ProtectedRoute path="/workouts" render={() => <IndexWorkout />} />
      <ProtectedRoute path="/sessions/:sessionId" render={(props: any) => <ShowSession {...props} />} />
      <ProtectedRoute path="/sessions" render={() => <IndexSession />} />

      <Route path="*" render={() => <Redirect to="/login" />} />
    </Switch>
  )
}

export default Routes
