import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
// import { RootState } from '../../app/store'

import { WorkoutType } from '../workouts/workoutsSlice'
import { ExerciseInstanceType } from '../exerciseInstance/exerciseInstancesSlice'

export interface SessionType {
  id: string,
  workout: WorkoutType,
  exerciseInstances: ExerciseInstanceType[]
  date: number
}

interface SessionStateType {
  sessions: SessionType[]
  currentSession: SessionType | null
  status: 'idle' | 'succeeded'
  error: string | null
}

const initialState: SessionStateType = {
  currentSession: null,
  sessions: [],
  status: 'idle',
  error: null
}

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    // functionality set session to currentSession
    storeCurrentSession(state, action: PayloadAction<SessionType>) {
      const newSession = action.payload
      state.currentSession = newSession
    },

    // Adds newly created session in list of sessions
    storeNewSession(state, action) {}
  }
})

export const {
  storeCurrentSession,
  // storeNewSession
} = sessionsSlice.actions

export default sessionsSlice.reducer
