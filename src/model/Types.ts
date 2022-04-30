import { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client'

export interface WorkoutType {
  description: string | null | undefined
  readonly id: string | undefined
  length: number | null | undefined
  location: string | null | undefined
  name: string
  exercises?: ExerciseType[]
}

export interface SessionType {
  readonly id: string,
  workout: WorkoutType,
  exerciseInstances: ExerciseInstanceType[]
  date: number
  completed: boolean
}

export interface ExerciseType {
  readonly id?: string
  name: string
  reps: number
  sets: number | null
  weight: number | null
  unit: string | null
  workout?: WorkoutType | null
}

export interface ExerciseInstanceType {
  readonly id: string
  exercise: ExerciseType
  setsCompleted: number
  repsCompleted: number
}

export interface ErrorMessage {
  error: string
}

export type GqlString = (
  DocumentNode
  | TypedDocumentNode<any, OperationVariables>
)

export interface SetIncrementArgs {
  exInstId: string
  setsCompleted: number
  maxSets: number
}

export type HandleSetIncrementType = (args: SetIncrementArgs) => Promise<void>

// interface AuthSuccess {
//   token: string
// }

// interface AuthError {
//   error: string
// }

export interface AuthResType {
  token: string | undefined
  error: string | undefined
}