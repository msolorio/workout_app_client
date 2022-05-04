import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'

const INCREMENT_SET = gql`
  mutation UpdateSetMutation(
    $id: ID!,
    $setsCompleted: Int!
  ) {
    updateSetForExInstance(
      id: $id,
      setsCompleted: $setsCompleted
    ) { id }
  }
`

function useIncrementSet() {
  const handledMut = useHandledMutation(INCREMENT_SET)

  async function incrementSet(exInstId: string, setsCompleted: number): Promise<void> {
    await handledMut({
      variables: {
        id: exInstId,
        setsCompleted: setsCompleted + 1
      }
    })
  }

  return incrementSet
}

export default useIncrementSet
