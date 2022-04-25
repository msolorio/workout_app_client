export interface WorkoutType {
  description: string | null | undefined
  id: string | undefined
  length: number | null | undefined
  location: string | null | undefined
  name: string
  exercises?: ExerciseType[]
}

export interface ExerciseType {
  id?: string
  name: string
  reps: number
  sets: number | null
  weight: number | null
  unit: string | null
  workout?: WorkoutType | null
}
