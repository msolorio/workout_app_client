import { RouteComponentProps } from 'react-router-dom'

interface Props {
  workoutId: string
}

function EditWorkout({ match }: RouteComponentProps<Props>) {
  console.log('match.params.workoutId ==>', match.params.workoutId)

  return (
    <main>
      <h2>Edit Workout</h2>
    </main>
  )
}

export default EditWorkout
