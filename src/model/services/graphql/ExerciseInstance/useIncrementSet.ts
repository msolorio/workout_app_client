import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice'

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
  const [mutation] = useMutation(INCREMENT_SET)
  const token: string = useAppSelector(selectLoginTokenInRdx)

  async function incrementSet(exInstId: string, setsCompleted: number) {
    await mutation({
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
