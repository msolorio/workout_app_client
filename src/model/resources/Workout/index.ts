import { WorkoutType } from '../../Types'
import gql from '../../services/graphql'
import rdx from '../../services/redux'

const Workout = {

  useCreateWorkout() {
    const createWorkoutGql = gql.Workout.useCreateWorkout()
    const createWorkoutRdx = rdx.Workout.useCreateWorkout()

    async function createWorkout(workoutData: WorkoutType) {
      const createdWorkout = await createWorkoutGql(workoutData)

      if (!createdWorkout.error) createWorkoutRdx(createdWorkout)

      return createdWorkout
    }

    return createWorkout
  },



  useUpdateWorkout() {
    const updateWorkoutGql = gql.Workout.useUpdateWorkout()
    const updateWorkoutRdx = rdx.Workout.useUpdateWorkout()

    async function updateWorkout(workoutData: WorkoutType) {
      const updatedWorkout = await updateWorkoutGql(workoutData)
      
      if (!updatedWorkout.error) updateWorkoutRdx(updatedWorkout)
    }

    return updateWorkout
  },



  useGetWorkoutById(workoutId: string) {
    return rdx.Workout.useGetWorkoutById(workoutId)
  },


  useGetMyWorkouts() {
    return rdx.Workout.useGetMyWorkouts()
  }

}

export default Workout
