import { gql } from '@apollo/client'

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

export default INCREMENT_SET
