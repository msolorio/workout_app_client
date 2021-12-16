import { useState } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useMutation, useQuery, gql } from '@apollo/client';
import { WorkoutType } from '../../features/workouts/workoutsSlice'
import { RootState } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import WorkoutForm from '../../components/WorkoutForm'

// TODO: set up update query
const ONE_WORKOUT = gql`
  query GetOneWorkout($workoutId: ID!) {
    workout(id: $workoutId) {
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
`

interface Props {
  workoutId: string
}

function EditWorkout({ match }: RouteComponentProps<Props>) {
  const workoutId = match.params.workoutId
  const [state, setState] = useState({ redirectToWorkout: false })
  const dispatch = useAppDispatch()

  const allWorkouts = useAppSelector((state: RootState) => state.workouts.workouts)

  let currentWorkout: WorkoutType | undefined = allWorkouts.find((workout) => workout.id === workoutId)
  
  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    skip: !!currentWorkout,
    variables: { workoutId }
  })

  if (data) currentWorkout = data.workout

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Something went wrong. Please try again.</h2>

  console.log('currentWorkout ==>', currentWorkout)
  

  const handleUpdateWorkout = async () => {
    console.log('called handleUpdateWorkout')

    // TODO: trigger update query on submit

    // TODO: update state to trigger redirect
  }

  // TODO: pass workout data to workout form
  return (
    <main>
      <h2>Edit Workout</h2>
      <WorkoutForm
        handleSubmit={handleUpdateWorkout}
        submitBtnText="Edit Workout"
        workoutData={currentWorkout}
      />
    </main>
  )
}

export default EditWorkout
