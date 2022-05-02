import { WorkoutType } from '../../Types'
import gql from '../../services/graphql'
import rdx from '../../services/redux'
import { WorkoutOrErrorType } from '../../Types'

const Workout = {

  useCreateWorkout() {
    const createWorkoutGql = gql.Workout.useCreateWorkout()
    const createWorkoutRdx = rdx.Workout.useCreateWorkout()

    async function createWorkout(workoutData: WorkoutType): Promise<WorkoutOrErrorType> {
      const newWorkout = await createWorkoutGql(workoutData)

      if (!newWorkout.error) {
        createWorkoutRdx(newWorkout)
      }

      return newWorkout
    }

    return createWorkout
  },


  useUpdateWorkout() {
    const updateWorkoutGql = gql.Workout.useUpdateWorkout()
    const updateWorkoutRdx = rdx.Workout.useUpdateWorkout()

    async function updateWorkout(workoutData: WorkoutType): Promise<void> {
      const updatedWorkout = await updateWorkoutGql(workoutData)
      
      if (!updatedWorkout.error) {
        updateWorkoutRdx(updatedWorkout)
      }
    }

    return updateWorkout
  },



  useGetWorkoutById(workoutId: string): WorkoutType | undefined {
    return rdx.Workout.useGetWorkoutById(workoutId)
  },


  useGetMyWorkouts(): WorkoutType[] {
    return rdx.Workout.useGetMyWorkouts()
  }

}

export default Workout
