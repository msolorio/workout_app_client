import { gql } from '@apollo/client'

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

export default INCREMENT_SET
