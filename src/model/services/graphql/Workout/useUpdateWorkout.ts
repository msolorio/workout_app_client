import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { WorkoutType } from '../../../Types'

const UPDATE_WORKOUT = gql`
  mutation UpdateWorkoutMutation(
    $token: String!
    $id: ID!
    $name: String
    $location: String
    $description: String
    $length: Int
    $exercises: [InputUpdateExercise!]
  ) {
    updateWorkout(
      token: $token
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

function useUpdateWorkout() {
  const handledMut = useHandledMutation(UPDATE_WORKOUT)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  return async function updateWorkoutGql(workoutData: WorkoutType) {
    const updatedWorkout = await handledMut({
      variables: { ...workoutData, token: logintoken }
    })

    return updatedWorkout
  }
}

export default useUpdateWorkout
