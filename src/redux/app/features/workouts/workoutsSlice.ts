import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../../store'
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
  workouts: WorkoutType[]
  status: 'idle' | 'succeeded'
  error: string | null
}

const initialState: WorkoutsStateType = {
  workouts: [],
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
      state.workouts.push(action.payload)
    },

    updateWorkoutRdx(state, action: PayloadAction<WorkoutType>) {
      const workoutFromDb = action.payload
      const workoutId = workoutFromDb.id

      const updatedWorkouts = state.workouts.map((workout) => {
        return workout.id === workoutId ? {...workout, ...workoutFromDb} : workout
      })

      state.workouts = updatedWorkouts
    },

    removeWorkouts(state) {
      state.workouts = []
    }
  }
})

export const selectAllWorkouts = (state: RootState) => state.workouts.workouts

export const {
  storeWorkouts,
  storeNewWorkout,
  updateWorkoutRdx,
  removeWorkouts
} = workoutsSlice.actions

export default workoutsSlice.reducer