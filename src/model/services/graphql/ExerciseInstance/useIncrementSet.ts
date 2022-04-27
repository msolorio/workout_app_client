import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice'
import useHandledMutation from '../utils/useHandledMutation'

const INCREMENT_SET = gql`
  mutation UpdateSetMutation(
    $token: String!
    $id: ID!,
    $setsCompleted: Int!
  ) {
    updateSetForExInstance(
      token: $token,
      id: $id,
      setsCompleted: $setsCompleted
    ) { id }
  }
`

function useIncrementSet() {
  const handledMut = useHandledMutation(INCREMENT_SET)
  const token: string = useAppSelector(selectLoginTokenInRdx)

  async function incrementSet(exInstId: string, setsCompleted: number) {
    await handledMut({
      variables: {
        token: token,
        id: exInstId,
        setsCompleted: setsCompleted + 1
      }
    })
  }

  return incrementSet
}

export default useIncrementSet
