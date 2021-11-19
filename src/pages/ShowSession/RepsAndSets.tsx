function RepsAndSets({
  reps,
  sets,
  repsCompleted,
  setsCompleted
}: any) {
  if (!sets && reps) {
    return <p>Reps: <button>{repsCompleted}/{reps}</button></p>
  }

  return (
    <>
      <p>Reps: {reps}</p>
    
      {/* TODO: on button click - update DB / update redux */}
      <p>Sets: <button>{setsCompleted}/{sets}</button></p>
    </>  
  )
}

export default RepsAndSets