import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import {
  storeWorkouts,
  selectAllWorkouts,
  storeNewWorkout,
  selectWorkoutById,
  updateWorkoutRdx,
  removeWorkouts
} from '../reduxApi/features/workouts/workoutsSlice'
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
  },
  
  useStoreWorkouts() {
    const dispatch = useAppDispatch()

    return function storeWorkoutsRdx(workouts: WorkoutType[]) {
      dispatch(storeWorkouts(workouts))
    }
  },

  useRemoveWorkouts() {
    const dispatch = useAppDispatch()

    return function removeWorkoutsRdx() {
      dispatch(removeWorkouts())
    }
  }
}

export default Workout
