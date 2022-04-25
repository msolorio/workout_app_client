import { useState } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { WorkoutType } from '../../model/services/redux/features/workouts/workoutsSlice'
import WorkoutForm from '../../components/WorkoutForm'
import model from '../../model/clientOps'

interface Props {
  workoutId: string
}


function EditWorkout({ match }: RouteComponentProps<Props>) {
  const workoutId = match.params.workoutId
  const [state, setState] = useState({ redirectToWorkout: false })

  const currentWorkout = model.Workout.useGetWorkoutById(workoutId)
  const updateWorkout = model.Workout.useUpdateWorkout()

  if (!currentWorkout) {
    console.log('No workout found with that id')
    return <Redirect to="/workouts" />
  }


  const handleUpdateWorkout = async (workoutData: WorkoutType) => {
    await updateWorkout(workoutData)
    
    setState({ redirectToWorkout: true })
  }


  if (state.redirectToWorkout) return <Redirect to={`/workouts/${workoutId}`} />

  return (
    <main className="main">
      <h2 className="pageHeader">Edit Your Workout</h2>
      <WorkoutForm
        handleSubmit={handleUpdateWorkout}
        submitBtnText="Save Workout"
        workoutData={currentWorkout}
      />
    </main>
  )
}

export default EditWorkout
