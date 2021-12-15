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
  completed: boolean
}

interface ExInstanceIdPL {
  exInstId: string
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
    storeNewSession(state, action: PayloadAction<SessionType>) {
      state.sessions.push(action.payload)
    },

    storeSessions(state, action: PayloadAction<SessionType[]>) {
      state.sessions = action.payload
    },

    incrementSetForExInst(state, action: PayloadAction<ExInstanceIdPL>) {
      console.log('action ==>', action)

      const exInst = state.currentSession?.exerciseInstances.find((exInst) => {
        return exInst.id === action.payload.exInstId
      })

      const maxSets = exInst?.exercise.sets

      console.log('maxSets ==>', maxSets)
      

      if (exInst && maxSets && exInst.setsCompleted < maxSets) {
        exInst.setsCompleted += 1
      }
    }
  }
})

export const {
  storeCurrentSession,
  incrementSetForExInst,
  storeNewSession,
  storeSessions
} = sessionsSlice.actions

export default sessionsSlice.reducer
