import { Redirect, Link } from 'react-router-dom'
import { WorkoutType, ExerciseType } from '../../../model/Types'
import Exercise from './Exercise'

interface Props {
  sessionId: string
  workout: WorkoutType
  handleCreateSession: (workoutId: string) => void
}

function ShowWorkout({
  sessionId,
  workout,
  handleCreateSession
}: Props): JSX.Element {

  function renderExercises(exercises: ExerciseType[]): React.ReactNode {
    return exercises.map((ex: ExerciseType) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }


  if (sessionId) return <Redirect to={`/sessions/${sessionId}`} />

  return (
    <main className="main">
      <h2 className="pageHeader">{workout.name}</h2>
      
      { workout.length ? <p className="cornerText description">{workout.length} minutes</p> : '' }


      <div className="row_centered marginBottom">
        <button 
          className="button button_accent marginRight"
          onClick={() => handleCreateSession(workout.id as string)}
        >
          Start Session
        </button>

        <Link to={`/workouts/${workout.id}/edit`}>
          <button className="button button_standard">
            Edit Workout
          </button>
        </Link>
      </div>

      { workout.location && <p className="description_small marginBottom">Location: {workout.location}</p> }

      { workout.description && <p className="description marginBottom">{workout.description}</p> }

      <div className="divider" />

      <ul>
        {renderExercises(workout.exercises as ExerciseType[])}
      </ul>
    </main>
  )
}

export default ShowWorkout