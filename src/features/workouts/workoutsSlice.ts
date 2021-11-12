import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ExerciseType } from '../exercises/exercisesSlice'

export interface WorkoutType {
  description: string | null
  id: string
  length: null | number
  location: string
  name: string
  exercises?: ExerciseType[]
}

interface WorkoutsStateType {
  workouts: WorkoutType[]
  currentWorkout: WorkoutType | null
  status: 'idle' | 'succeeded'
  error: string | null
}

const initialState: WorkoutsStateType = {
  workouts: [],
  currentWorkout: null,
  status: 'idle',
  error: null
}

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    storeWorkouts(state, action: PayloadAction<WorkoutType[]>) {
      state.workouts = state.workouts.concat(action.payload)
      state.status = 'succeeded'
    },

    storeNewWorkout(state, action) {
      state.workouts.push(action.payload)
    },

    storeCurrentWorkout(state, action) {
      console.log('called storeCurrentWorkout')

      state.currentWorkout = action.payload
    }
  }
})

export const selectAllWorkouts = (state: RootState) => state.workouts.workouts

export const {
  storeWorkouts,
  storeNewWorkout,
  storeCurrentWorkout
} = workoutsSlice.actions

export default workoutsSlice.reducer