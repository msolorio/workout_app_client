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

interface Props {
  reps: number
  sets: number | null
  repsCompleted: number
  setsCompleted: number
  exInstId: string
  sessionId: string
}

function RepsAndSets({
  reps,
  sets,
  repsCompleted,
  setsCompleted,
  exInstId,
  sessionId
}: Props) {


  const [incrementSetForExInstance] = useMutation(INCREMENT_SET)
  const dispatch = useAppDispatch()

  if (!sets && reps) {
    return <p>Reps: <button>{repsCompleted}/{reps}</button></p>
  }

  const handleSetIncrement = async () => {    
    if (!sets || setsCompleted >= sets) return

    await incrementSetForExInstance({
      variables: {
        id: exInstId,
        setsCompleted: setsCompleted + 1
      }
    })

    dispatch(incrementSetForExInst({
      exInstId: exInstId,
      sessionId: sessionId
    }))
  }

  const handleRepIncrement = async () => {
    if (repsCompleted >= reps) return

    await incrementSetForExInstance({
      variables: {
        id: exInstId,
        repsCompleted: repsCompleted + 1
      }
    })

    // dispatch(incrementSetForExInst({
    //   exInstId: exInstId,
    //   sessionId: sessionId
    // }))
  }

  function renderSets() {
    if (sets) {
      return (
        <p>
          <span>Sets:</span>
          <button onClick={handleSetIncrement}>
          {setsCompleted}/{sets}
          </button>
        </p>
      )
    }

    return
  }

  function renderReps() {
    if (!sets) {
      return (
        <p>
          <span>Reps:</span>
          <button onClick={handleRepIncrement}>
          {repsCompleted}/{reps}
          </button>
        </p>
      ) 
    }

    return <p>Reps: {reps}</p>
  }

  return (
    <>
      {renderReps()}
      {renderSets()}
    </>  
  )
}

export default RepsAndSets