export interface WorkoutType {
  description: string | null | undefined
  id: string | undefined
  length: number | null | undefined
  location: string | null | undefined
  name: string
  exercises?: ExerciseType[]
}

export interface SessionType {
  id: string,
  workout: WorkoutType,
  exerciseInstances: ExerciseInstanceType[]
  date: number
  completed: boolean
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

export interface ExerciseInstanceType {
  id: string
  exercise: ExerciseType
  setsCompleted: number
  repsCompleted: number
}