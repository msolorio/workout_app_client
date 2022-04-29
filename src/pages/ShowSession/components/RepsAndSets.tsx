import { HandleSetIncrementType } from '../../../model/Types'

interface Props {
  reps: number
  sets: number | null
  repsCompleted: number
  setsCompleted: number
  exInstId: string
  handleSetIncrement: HandleSetIncrementType
}

function RepsAndSets({
  reps,
  sets,
  repsCompleted,
  setsCompleted,
  exInstId,
  handleSetIncrement
}: Props): JSX.Element {
  if (!sets && reps) {
    return <p>Reps: <button>{repsCompleted}/{reps}</button></p>
  }

  const handleSetClick = async () => {    
    if (sets) {
      handleSetIncrement({
        exInstId,
        setsCompleted,
        maxSets: sets
      })
    }
  }

  const handleRepIncrement = async () => {
  }

  function renderSets() {
    if (sets) {
      return (
        <span className="description">
          <span className="marginRight">Sets:</span>
          <button className="button-sets inline" onClick={handleSetClick}>
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