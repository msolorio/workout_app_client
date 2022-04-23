import { configureStore } from '@reduxjs/toolkit'
import workoutsReducer from './features/workouts/workoutsSlice'
import sessionsReducer from './features/sessions/sessionsSlice'
import authReducer from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    sessions: sessionsReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
