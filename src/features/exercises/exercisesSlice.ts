import { WorkoutType } from '../workouts/workoutsSlice'

export interface ExerciseType {
  id: String
  name: String
  reps: Number
  sets: Number | null
  weight: Number | null
  unit: Number | null
  workout?: WorkoutType | null
}
