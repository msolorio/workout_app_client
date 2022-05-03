import { gql } from '@apollo/client'
// import { useAppSelector } from '../../redux/reduxApi/app/hooks'
// import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice'
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
  // const token: string = useAppSelector(selectLoginTokenInRdx)

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
