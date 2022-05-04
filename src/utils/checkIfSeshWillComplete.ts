import { SessionType, ExerciseInstanceType } from '../model/Types'

// TODO: Computation to mark session complete should be moved serverside
function checkIfSeshWillComplete(session: SessionType) {
  const totalMaxSets = session.exerciseInstances.reduce((acc, exInst: ExerciseInstanceType) => {
    if (exInst.exercise.sets) {
      return acc + exInst.exercise.sets
    }

    return acc
  }, 0)

  const totalSetsCompleted = session.exerciseInstances.reduce((acc, exInst: ExerciseInstanceType) => {
    if (exInst.exercise.sets) {
      return acc + exInst.setsCompleted
    }

    return acc
  }, 0)

  if (totalSetsCompleted + 1 === totalMaxSets) {
    return true

  } else {
    return false

  }
}

export default checkIfSeshWillComplete
