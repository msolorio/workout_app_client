import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { WorkoutType } from '../../model/services/redux/reduxApi/features/workouts/workoutsSlice'
import CreateWorkoutUi from './components/CreateWorkoutUi'

import model from '../../model'

interface State {
  workoutId: null | string
}

function CreateWorkout() {
  const createWorkout = model.Workout.useCreateWorkout()

  const stateObj: State = {
    workoutId: null
  }

  const [state, setState] = useState(stateObj)


  const handleCreateWorkout = async (workoutData: WorkoutType) => {
    const createdWorkout = await createWorkout(workoutData)

    setState({ workoutId: createdWorkout.id })
  }


  if (state.workoutId) return <Redirect to={`/workouts/${state.workoutId}`} />

  return (
    <CreateWorkoutUi handleCreateWorkout={handleCreateWorkout} />
  )
}

export default CreateWorkout;
