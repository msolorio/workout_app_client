import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { storeNewWorkout, selectAllWorkouts, storeWorkouts } from '../../features/workouts/workoutsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import WorkoutForm from '../../components/WorkoutForm'

const WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      name
      description
      length
      location
      exercises {
        id
        name
        reps
        sets
        weight
        unit
      }
    }
  }
`;

const CREATE_WORKOUT = gql`
  mutation CreateWorkoutMutation(
    $name: String!,
    $location: String!,
    $description: String,
    $length: Int,
    $exercises: [InputExercise!]
  ) {
    createWorkout(
      name: $name,
      location: $location,
      description: $description,
      length: $length,
      exercises: $exercises
    ) {
      id
      name
      description
      length
      location
      exercises {
        name
        reps
        sets
        unit
        weight
        id
      }
    }
  }
`;

interface State {
  workoutId: null | string
}

// Create Workout Component //////////////////////////////////////////////////////////////
function CreateWorkout() {
  const stateObj: State = { workoutId: null }
  const [state, setState] = useState(stateObj)
  const dispatch = useAppDispatch()
  const [createWorkout] = useMutation(CREATE_WORKOUT)

  let allWorkouts = useAppSelector(selectAllWorkouts)

  const { loading, error, data } = useQuery(WORKOUTS, {
    skip: !!allWorkouts.length
  })

  useEffect(() => {
    if (data) dispatch(storeWorkouts(data.workouts))
  })

  if (loading) return <h2>Loading...</h2>

  if (error) {
    console.log('Something went wrong')
    return <Redirect to="/workouts" />
  }

  const handleCreateWorkout = async (workoutData: any) => {
    try {
      const response = await createWorkout({
        variables: { ...workoutData }
      });

      const createdWorkout = response.data.createWorkout

      dispatch(storeNewWorkout(createdWorkout))

      setState({ workoutId: createdWorkout.id })
      
    } catch (err) {
      console.log('Error creating workout ==>', err);
    }
  }


  if (state.workoutId) return <Redirect to={`/workouts/${state.workoutId}`} />

  return (
    <main>
      <h2>New Workout</h2>
      <WorkoutForm
        handleSubmit={handleCreateWorkout}
        submitBtnText="Create Workout"
      />
    </main>
  )
}

export default CreateWorkout;
