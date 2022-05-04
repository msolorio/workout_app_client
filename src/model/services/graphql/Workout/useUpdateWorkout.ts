import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
import { WorkoutType, WorkoutOrErrorType } from '../../../Types'

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

function useUpdateWorkout() {
  const handledMut = useHandledMutation(UPDATE_WORKOUT)

  return async function updateWorkoutGql(workoutData: WorkoutType): Promise<WorkoutOrErrorType> {
    const updatedWorkout = await handledMut({
      variables: { ...workoutData }
    })

    return updatedWorkout
  }
}

export default useUpdateWorkout
