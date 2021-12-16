import { useState, useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useMutation, useQuery, gql } from '@apollo/client';
import { WorkoutType, updateWorkoutRdx, selectAllWorkouts, storeWorkouts } from '../../features/workouts/workoutsSlice'
import { RootState } from '../../app/store'
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

// const ONE_WORKOUT = gql`
//   query GetOneWorkout($workoutId: ID!) {
//     workout(id: $workoutId) {
//       id
//       name
//       description
//       length
//       location
//       exercises {
//         id
//         name
//         reps
//         sets
//         weight
//         unit
//       }
//     }
//   }
// `

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
  
  let allWorkouts = useAppSelector(selectAllWorkouts)

  let currentWorkout = allWorkouts?.find((workout: WorkoutType) => workout.id === workoutId)

  const { loading, error, data } = useQuery(WORKOUTS, {
    skip: !!allWorkouts.length
  })

  useEffect(() => {
    if (data) {
      dispatch(storeWorkouts(data.workouts))
    }
  })

  if (data) {
    console.log('in if')
    currentWorkout = data.workouts.find((workout: WorkoutType) => workout.id === workoutId)
  }

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Something went wrong. Please try again.</h2>



  const handleUpdateWorkout = async (workoutData: WorkoutType) => {
    try {
      const response = await updateWorkout({
        variables: { ...workoutData }
      })

      const workoutFromDb = response.data.updateWorkout

      dispatch(updateWorkoutRdx(workoutFromDb))

      setState({ redirectToWorkout: true })
    }
    catch (err) {
      console.error(err)
    }
  }



  if (state.redirectToWorkout) return <Redirect to={`/workouts/${workoutId}`} />

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
