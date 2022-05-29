import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import CreateWorkout from '../pages/CreateWorkout'
import IndexWorkout from '../pages/IndexWorkout'
import ShowWorkout from '../pages/ShowWorkout'
import IndexSession from '../pages/IndexSession'
import ShowSession from '../pages/ShowSession'
import EditWorkout from '../pages/EditWorkout'
import Signup from '../pages/Signup'
import Login from '../pages/Login'

interface WorkoutIdRouteParam {
  workoutId: string
}

interface SessionIdRouteParam {
  sessionId: string
}

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route exact path="/login" render={() => <Login />} />

      <ProtectedRoute
        path="/workouts/create"
        render={() => <CreateWorkout />}
      />

      <ProtectedRoute
        path="/workouts/:workoutId/edit"
        render={(props: RouteComponentProps<WorkoutIdRouteParam>) => <EditWorkout {...props} />}
      />

      <ProtectedRoute
        path="/workouts/:workoutId"
        render={(props: RouteComponentProps<WorkoutIdRouteParam>) => <ShowWorkout {...props} />}
      />

      <ProtectedRoute
        path="/workouts"
        render={() => <IndexWorkout />}
      />

      <ProtectedRoute
        path="/sessions/:sessionId"
        render={(props: RouteComponentProps<SessionIdRouteParam>) => <ShowSession {...props} />} />

      <ProtectedRoute
        path="/sessions"
        render={() => <IndexSession />}
      />

      <Route
        path="*"
        render={() => <Redirect to="/login" />}
      />
    </Switch>
  )
}

export default Routes
