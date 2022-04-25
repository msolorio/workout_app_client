import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {useMutation } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../model/services/redux/app/hooks'
import { WorkoutType, selectAllWorkouts } from '../../model/services/redux/features/workouts/workoutsSlice'
import { storeNewSession } from '../../model/services/redux/features/sessions/sessionsSlice'
import { ExerciseType } from '../../model/services/redux/features/exercises/exercisesSlice'
import { selectLoginTokenInRdx } from '../../model/services/redux/features/auth/authSlice';
import CREATE_SESSION from '../../queries/sessions/createSession'
import Exercise from './Exercise'
import model from '../../model/clientOps'

interface Props {
  workoutId: string
}

function ShowWorkout({ match }: RouteComponentProps<Props>) {
  const { workoutId } = match.params

  const currentWorkout = model.Workout.useGetWorkoutById(workoutId)
  
  const [state, setState] = useState({ sessionId: null })

  // Move to custom hook
  const dispatch = useAppDispatch()
  const [createSession] = useMutation(CREATE_SESSION)



  
  // Fetching data from redux - Move to custom hook
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

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

    // GraphQL and redux storage - Move to custom hook
    try {
      const response = await createSession({ variables: { token: logintoken, workoutId: id } })
      const newSession = response.data.createSession
  
      dispatch(storeNewSession(newSession))
  
      setState({
        ...state,
        sessionId: newSession.id
      })
    } catch(err) {
      console.log('err creating session ==>', err)
    }
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