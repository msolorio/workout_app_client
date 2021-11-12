import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  useQuery,
  gql
} from '@apollo/client';
import { isJsxClosingFragment } from 'typescript';
import { RootState } from '../../app/store'

interface Workout {
  description: string | null
  id: string
  length: null | number
  location: string
  name: string
}

interface WorkoutsStateType {
  workouts: Workout[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
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
    storeWorkouts(state, action: PayloadAction<Workout[]>) {
      state.workouts = state.workouts.concat(action.payload)
    }
  }
})

export const selectAllWorkouts = (state: RootState) => state.workouts.workouts

export const { storeWorkouts } = workoutsSlice.actions

export default workoutsSlice.reducer