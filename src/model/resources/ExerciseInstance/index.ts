import gql from '../../services/graphql'
import rdx from '../../services/redux'
import { SessionType } from '../../Types'

interface incrementSetArgs {
  exInstId: string,
  setsCompleted: number,
  maxSets: number,
  currentSession: SessionType  
}

const ExerciseInstance = {
  useIncrementSet() {
    const incrementSetGql = gql.ExerciseInstance.useIncrementSet()
    const incrementSetRdx = rdx.ExerciseInstance.useIncrementSet()
    const completeSessionGql = gql.Session.useCompleteSession()

    async function incrementSet({
      exInstId,
      setsCompleted,
      maxSets,
      currentSession,
    }: incrementSetArgs) {
      if (!maxSets || setsCompleted >= maxSets) return

      await incrementSetGql(exInstId, setsCompleted)
      incrementSetRdx(exInstId, currentSession.id)

      if (currentSession.completed) {
        await completeSessionGql(currentSession.id)
      }
    }

    return incrementSet
  }
}

export default ExerciseInstance
