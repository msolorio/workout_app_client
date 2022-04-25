import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client';
import { useAppSelector } from '../../redux/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/features/auth/authSlice';
import { WorkoutType } from '../../../Types'

export const CREATE_WORKOUT = gql`
  mutation CreateWorkoutMutation(
    $token: String!
    $name: String!,
    $location: String!,
    $description: String,
    $length: Int,
    $exercises: [InputExercise!]
  ) {
    createWorkout(
      token: $token,
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

function useCreateWorkout() {
  const [mutation] = useMutation(CREATE_WORKOUT)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  return async function createWorkoutGql(workoutData: WorkoutType) {
    const response = await mutation({
      variables: { ...workoutData, token: logintoken }
    });

    return response.data.createWorkout
  }
}

export default useCreateWorkout
