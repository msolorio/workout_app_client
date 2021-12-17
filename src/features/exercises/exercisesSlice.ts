import { WorkoutType } from '../workouts/workoutsSlice'

export interface ExerciseType {
  id?: string
  name: string
  reps: number
  sets: number | null
  weight: number | null
  unit: number | null
  workout?: WorkoutType | null
}
