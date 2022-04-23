import { SessionType } from '../redux/app/features/sessions/sessionsSlice'
import { ExerciseInstanceType } from '../redux/app/features/exerciseInstance/exerciseInstancesSlice'

function checkIfSeshComplete(session: SessionType): boolean {
  return session.exerciseInstances.every((exInstance: ExerciseInstanceType) => {
    if (exInstance.exercise.sets) {
      return exInstance.setsCompleted >= exInstance.exercise.sets
    }
    return false
  })
}

export default checkIfSeshComplete