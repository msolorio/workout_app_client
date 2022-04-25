import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import checkIfSeshComplete from '../../../../../utils/checkIfSeshComplete'
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
  exInstId: string,
  sessionId: string
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
    storeNewSession(state, action: PayloadAction<SessionType>) {
      state.sessions.push(action.payload)
    },


    storeSessions(state, action: PayloadAction<SessionType[]>) {
      state.sessions = action.payload
    },


    incrementSetForExInst(state, action: PayloadAction<ExInstanceIdPL>) {

      const { sessionId, exInstId } = action.payload

      function getUpdatedSesh(session: SessionType) {
        const updatedExInsts = session.exerciseInstances.map((exInst) => {
          if (exInst.id === exInstId) exInst.setsCompleted += 1
          return exInst
        })

        session.exerciseInstances = updatedExInsts

        if (checkIfSeshComplete(session)) session.completed = true

        return session
      }

      const updatedSessions = state.sessions.map((session) => {
        return session.id === sessionId ? getUpdatedSesh(session) : session
      })

      state.sessions = updatedSessions
    },

    removeSessions(state) {
      state.sessions = []
    }
  }
})

export const selectAllSessions = (state: RootState) => state.sessions.sessions

export const selectSessionById = (sessionId: string) => {
  return (state: RootState) => {
    return state.sessions.sessions?.find((session: SessionType) => session.id === sessionId)
  }
}

export const {
  incrementSetForExInst,
  storeNewSession,
  storeSessions,
  removeSessions
} = sessionsSlice.actions

export default sessionsSlice.reducer
