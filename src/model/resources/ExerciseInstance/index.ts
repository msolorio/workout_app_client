import gql from '../../services/graphql'
import rdx from '../../services/redux'
import { SessionType } from '../../Types'
import checkIfSeshWillComplete from '../../../utils/checkIfSeshWillComplete'

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

      // TODO: This computation should be moved serverside in
      // exInst update model
      if (checkIfSeshWillComplete(currentSession)) {
        completeSessionGql(currentSession.id)
      }
    }

    return incrementSet
  }
}

export default ExerciseInstance
