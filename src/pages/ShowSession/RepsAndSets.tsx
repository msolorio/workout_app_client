import {
  useMutation,
  gql
} from '@apollo/client'
import { useAppDispatch } from '../../app/hooks'
import { incrementSetForExInst } from '../../features/sessions/sessionsSlice'

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

function RepsAndSets({
  reps,
  sets,
  repsCompleted,
  setsCompleted,
  exInstId
}: any) {
  const [incrementSetForExInstance] = useMutation(INCREMENT_SET)
  const dispatch = useAppDispatch()

  if (!sets && reps) {
    return <p>Reps: <button>{repsCompleted}/{reps}</button></p>
  }

  const handleSetComplete = async () => {
    console.log('called handleSetcomplete')
    const updatedSets = setsCompleted + 1

    // Update DB with GraphQL
    await incrementSetForExInstance({
      variables: {
        id: exInstId,
        setsCompleted: updatedSets
      }
    })

    // TODO: Update Redux
    dispatch(incrementSetForExInst({
      exInstId: exInstId
    }))
  }

  return (
    <>
      <p>Reps: {reps}</p>
    
      {/* TODO: on button click - update DB / update redux */}
      <p>
        <span>Sets:</span>
        <button onClick={handleSetComplete}>
        {setsCompleted}/{sets}
        </button>
      </p>
    </>  
  )
}

export default RepsAndSets