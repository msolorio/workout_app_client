import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import CreateWorkoutUi from './components/CreateWorkoutUi'
import { WorkoutType } from '../../model/Types'

import model from '../../model'

export interface State {
  workoutId: null | string
}

function CreateWorkout(): JSX.Element {
  const createWorkout = model.Workout.useCreateWorkout()

  const stateObj: State = {
    workoutId: null
  }

  const [state, setState] = useState(stateObj)


  const handleCreateWorkout = async (workoutData: WorkoutType) => {
    const createdWorkout: WorkoutType = await createWorkout(workoutData)

    if (createdWorkout.id) {
      setState({ workoutId: createdWorkout.id })
    }
  }

  if (state.workoutId) return <Redirect to={`/workouts/${state.workoutId}`} />

  return (
    <CreateWorkoutUi handleCreateWorkout={handleCreateWorkout} />
  )
}


export default CreateWorkout;
