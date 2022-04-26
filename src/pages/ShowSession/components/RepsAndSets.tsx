interface Props {
  reps: number
  sets: number | null
  repsCompleted: number
  setsCompleted: number
  exInstId: string
  handleSetIncrement: any
}

function RepsAndSets({
  reps,
  sets,
  repsCompleted,
  setsCompleted,
  exInstId,
  handleSetIncrement
}: Props) {
  if (!sets && reps) {
    return <p>Reps: <button>{repsCompleted}/{reps}</button></p>
  }

  const handleSetClick = async () => {    
    handleSetIncrement({
      exInstId,
      setsCompleted,
      maxSets: sets
    })
  }

  const handleRepIncrement = async () => {
    // if (repsCompleted >= reps) return

    // await incrementSetForExInstance({
    //   variables: {
    //     id: exInstId,
    //     repsCompleted: repsCompleted + 1
    //   }
    // })

    // dispatch(incrementSetForExInst({
    //   exInstId: exInstId,
    //   sessionId: sessionId
    // }))
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