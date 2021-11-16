import { configureStore } from '@reduxjs/toolkit'
import workoutsReducer from '../features/workouts/workoutsSlice'
import sessionsReducer from '../features/sessions/sessionsSlice'

const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    sessions: sessionsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
