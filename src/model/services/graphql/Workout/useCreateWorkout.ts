import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
// import { useAppSelector } from '../../redux/reduxApi/app/hooks'
// import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { WorkoutType, ErrorMessage, WorkoutOrErrorType } from '../../../Types'

export const CREATE_WORKOUT = gql`
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

function useCreateWorkout() {
  const handledMut = useHandledMutation(CREATE_WORKOUT)
  // const token: string = useAppSelector(selectLoginTokenInRdx)

  return async function createWorkoutGql(workoutData: WorkoutType): Promise<WorkoutOrErrorType> {
    const createdWorkout: WorkoutType & ErrorMessage = await handledMut({
      variables: { ...workoutData }
    });

    return createdWorkout
  }
}

export default useCreateWorkout
