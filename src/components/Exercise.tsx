function Exercise(props: any) {


  return (
    <div>
      <h4>{props.exercise.name}</h4>
      <p>Reps: {props.exercise.reps}</p>
      <p>Sets: {props.exercise.sets}</p>
      <p>{props.exercise.weight} {props.exercise.unit}</p>
    </div>
  )
}

export default Exercise;