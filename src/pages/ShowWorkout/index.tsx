import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { SessionType } from '../../model/Types'
import model from '../../model'
import ShowWorkoutUi from './components/ShowWorkoutUi'

interface Props {
  workoutId: string
}

interface State {
  sessionId: string
}

function ShowWorkout({ match }: RouteComponentProps<Props>): JSX.Element {
  const { workoutId } = match.params
  const currentWorkout = model.Workout.useGetWorkoutById(workoutId)
  const createSession = model.Session.useCreateSession()

  const initialState: State = { sessionId: '' }
  const [state, setState] = useState(initialState)


  const handleCreateSession = async (workoutId: string) => {
    const createdSession: SessionType = await createSession(workoutId)
  
    setState({
      ...state,
      sessionId: createdSession.id
    })
  }

  
  if (!currentWorkout) {
    return <Redirect to="/workouts" />
  }

  if (state.sessionId) return <Redirect to={`/sessions/${state.sessionId}`} />

  return (
    <ShowWorkoutUi
      sessionId={state.sessionId}
      workout={currentWorkout}
      handleCreateSession={handleCreateSession}
    />
  )
}

export default ShowWorkout