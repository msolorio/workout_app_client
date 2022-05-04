import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ExerciseType } from '../exercises/exercisesSlice'

export interface WorkoutType {
  description: string | null | undefined
  id: string | undefined
  length: number | null | undefined
  location: string | null | undefined
  name: string
  exercises?: ExerciseType[]
}

interface WorkoutsStateType {
  workouts: WorkoutType[] | null
  status: 'idle' | 'succeeded'
  error: string | null
}

const initialState: WorkoutsStateType = {
  workouts: null,
  status: 'idle',
  error: null
}


const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    storeWorkouts(state, action: PayloadAction<WorkoutType[]>) {
      state.workouts = action.payload
      state.status = 'succeeded'
    },

    storeNewWorkout(state, action: PayloadAction<WorkoutType>) {
      if (state.workouts) {
        state.workouts.push(action.payload)
      }
    },

    updateWorkoutRdx(state, action: PayloadAction<WorkoutType>) {
      const workoutFromDb = action.payload
      const workoutId = workoutFromDb.id

      if (state.workouts) {
        const updatedWorkouts = state.workouts.map((workout) => {
          return workout.id === workoutId ? {...workout, ...workoutFromDb} : workout
        })
  
        state.workouts = updatedWorkouts
      }
    },

    removeWorkouts(state) {
      state.workouts = null
    }
  }
})

export const selectAllWorkouts = (state: RootState) => state.workouts.workouts

export const selectWorkoutById = (workoutId: string) => {
  return (state: RootState) => {
    return state.workouts.workouts?.find((workout: WorkoutType) => workout.id === workoutId)
  }
}

export const {
  storeWorkouts,
  storeNewWorkout,
  updateWorkoutRdx,
  removeWorkouts
} = workoutsSlice.actions

export default workoutsSlice.reducer