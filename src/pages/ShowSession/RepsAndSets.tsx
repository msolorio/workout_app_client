import { useMutation } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { incrementSetForExInst } from '../../features/sessions/sessionsSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
import INCREMENT_SET from '../../queries/sessions/incrementSet'

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
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)
  const [incrementSetForExInstance] = useMutation(INCREMENT_SET)
  const dispatch = useAppDispatch()

  if (!sets && reps) {
    return <p>Reps: <button>{repsCompleted}/{reps}</button></p>
  }

  const handleSetIncrement = async () => {    
    if (!sets || setsCompleted >= sets) return

    await incrementSetForExInstance({
      variables: {
        token: logintoken,
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

    dispatch(incrementSetForExInst({
      exInstId: exInstId,
      sessionId: sessionId
    }))
  }

  function renderSets() {
    if (sets) {
      return (
        <span className="description">
          <span>Sets:</span>
          <button className="button inline" onClick={handleSetIncrement}>
          {setsCompleted}/{sets}
          </button>
        </span>
      )
    }

    return
  }

  function renderReps() {
    if (!sets) {
      return (
        <span>
          <span>Reps:</span>
          <button onClick={handleRepIncrement}>
          {repsCompleted}/{reps}
          </button>
        </span>
      ) 
    }

    return <span className="description">Reps: {reps}</span>
  }


  return (
    <>
      {renderReps()}
      {renderSets()}
    </>  
  )
}

export default RepsAndSets