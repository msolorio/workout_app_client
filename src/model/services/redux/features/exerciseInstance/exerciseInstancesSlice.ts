import { ExerciseType } from "../exercises/exercisesSlice";

export interface ExerciseInstanceType {
  id: string
  exercise: ExerciseType
  setsCompleted: number
  repsCompleted: number
}
