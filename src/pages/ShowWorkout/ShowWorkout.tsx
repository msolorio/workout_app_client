import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { WorkoutType } from '../../model/services/redux/reduxApi/features/workouts/workoutsSlice'
import { ExerciseType } from '../../model/services/redux/reduxApi/features/exercises/exercisesSlice'
import Exercise from './Exercise'
import model from '../../model'

interface Props {
  workoutId: string
}

function ShowWorkout({ match }: RouteComponentProps<Props>) {
  const { workoutId } = match.params
  const currentWorkout = model.Workout.useGetWorkoutById(workoutId)
  const createSession = model.Session.useCreateSession()

  const [state, setState] = useState({
    sessionId: null
  })


  if (!currentWorkout) {
    console.log('No workout found with that id')
    return <Redirect to="/workouts" />
  }

  const {
    id,
    name,
    description,
    length,
    location,
    exercises
  } = currentWorkout as WorkoutType


  const handleCreateSession = async () => {
    const workoutId = id
    const createdSession = await createSession(workoutId as string)
  
    setState({
      ...state,
      sessionId: createdSession.id
    })
  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((ex: ExerciseType) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }


  if (state.sessionId) return <Redirect to={`/sessions/${state.sessionId}`} />

  return (
    <main className="main">
      <h2 className="pageHeader">{name}</h2>
      
      { length ? <p className="cornerText description">{length} minutes</p> : '' }


      <div className="row_centered marginBottom">
        <button className="button button_accent marginRight" onClick={handleCreateSession}>
          Start Session
        </button>

        <Link to={`/workouts/${id}/edit`}>
          <button className="button button_standard">
            Edit Workout
          </button>
        </Link>
      </div>

      { location && <p className="description_small marginBottom">Location: {location}</p> }

      { description && <p className="description marginBottom">{description}</p> }

      <div className="divider" />

      <ul>
        {renderExercises(exercises as ExerciseType[])}
      </ul>
    </main>
  )
}

export default ShowWorkout