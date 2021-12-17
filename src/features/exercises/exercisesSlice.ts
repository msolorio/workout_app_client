import { WorkoutType } from '../workouts/workoutsSlice'

export interface ExerciseType {
  id?: string
  name: string
  reps: number
  sets: number | null
  weight: number | null
  unit: string | null // TODO: should be string
  workout?: WorkoutType | null
  [key: string]: any
}
