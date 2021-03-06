import { useState } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { WorkoutType } from '../../model/Types'
import model from '../../model'
import EditWorkoutUi from './components/EditWorkoutUi'

interface Props {
  workoutId: string
}

interface State {
  workoutUpdated: boolean
}


function EditWorkout({ match }: RouteComponentProps<Props>): JSX.Element {
  const { workoutId } = match.params

  const currentWorkout = model.Workout.useGetWorkoutById(workoutId)
  const updateWorkout = model.Workout.useUpdateWorkout()

  const initialState: State = {
    workoutUpdated: false
  }
  const [state, setState] = useState(initialState)


  const handleUpdateWorkout = async (workoutData: WorkoutType): Promise<void> => {
    await updateWorkout(workoutData)
    
    setState({ workoutUpdated: true })
  }


  if (!currentWorkout) {
    return <Redirect to="/workouts" />
  }

  if (state.workoutUpdated) return <Redirect to={`/workouts/${workoutId}`} />

  return (
    <EditWorkoutUi
      handleUpdateWorkout={handleUpdateWorkout}
      currentWorkout={currentWorkout}
    />
  )
}

export default EditWorkout
