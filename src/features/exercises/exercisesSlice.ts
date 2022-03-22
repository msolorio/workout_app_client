import { WorkoutType } from '../workouts/workoutsSlice'

export interface ExerciseType {
  id?: string
  name: string
  reps: number
  sets: number | null
  weight: number | null
  unit: string | null
  workout?: WorkoutType | null
}
