import { SessionType } from '../model/services/redux/reduxApi/features/sessions/sessionsSlice'
import { ExerciseInstanceType } from '../model/services/redux/reduxApi/features/exerciseInstance/exerciseInstancesSlice'

function checkIfSeshComplete(session: SessionType): boolean {
  return session.exerciseInstances.every((exInstance: ExerciseInstanceType) => {
    if (exInstance.exercise.sets) {
      return exInstance.setsCompleted >= exInstance.exercise.sets
    }
    return false
  })
}

export default checkIfSeshComplete