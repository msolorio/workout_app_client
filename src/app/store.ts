import { configureStore } from '@reduxjs/toolkit'
import workoutsReducer from '../features/workouts/workoutsSlice'

const store = configureStore({
  reducer: {
    workouts: workoutsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
