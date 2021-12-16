import { useState } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useMutation, useQuery, gql } from '@apollo/client';
import { WorkoutType } from '../../features/workouts/workoutsSlice'
import { RootState } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import WorkoutForm from '../../components/WorkoutForm'

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

const UPDATE_WORKOUT = gql`
  mutation UpdateWorkoutMutation(
    $id: ID!
    $name: String
    $location: String
    $description: String
    $length: Int
    $exercises: [InputUpdateExercise!]
  ) {
    updateWorkout(
      id: $id
      name: $name
      location: $location
      description: $description
      length: $length
      exercises: $exercises
    ) {
      id
      name
      location
      description
      length
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

  const [updateWorkout] = useMutation(UPDATE_WORKOUT)

  const allWorkouts = useAppSelector((state: RootState) => state.workouts.workouts)

  let currentWorkout: WorkoutType | undefined = allWorkouts.find((workout) => workout.id === workoutId)
  
  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    skip: !!currentWorkout,
    variables: { workoutId }
  })

  if (data) currentWorkout = data.workout

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Something went wrong. Please try again.</h2>

  const handleUpdateWorkout = async (workoutData: any) => {
    console.log('called handleUpdateWorkout')

    console.log('workoutData ==>', workoutData)

    try {
      const response = await updateWorkout({
        variables: { ...workoutData }
      })

      console.log('response ==>', response)

    }
    catch (err) {
      console.error(err)
    }

    // TODO: update state to trigger redirect
  }

  return (
    <main>
      <h2>Edit Workout</h2>
      <WorkoutForm
        handleSubmit={handleUpdateWorkout}
        submitBtnText="Save Workout"
        workoutData={currentWorkout}
      />
    </main>
  )
}

export default EditWorkout
