import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectAllWorkouts, storeNewWorkout, selectWorkoutById, updateWorkoutRdx } from '../features/workouts/workoutsSlice'
import { WorkoutType } from '../../../Types'

const Workout = {
  useCreateWorkout() {
    const dispatch = useAppDispatch()
    
    return function createWorkoutRdx(createdWorkout: WorkoutType) {
      dispatch(storeNewWorkout(createdWorkout))
    }
  },
  
  useUpdateWorkout() {
    const dispatch = useAppDispatch()

    return function updateWorkoutInRdx(updatedWorkout: WorkoutType) {
      dispatch(updateWorkoutRdx(updatedWorkout))
    }
  },

  useGetMyWorkouts() {
    return useAppSelector(selectAllWorkouts)
  },

  useGetWorkoutById(workoutId: string) {
    return useAppSelector(selectWorkoutById(workoutId))
  }
}

export default Workout
