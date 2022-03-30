import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { WorkoutType, selectAllWorkouts } from '../../features/workouts/workoutsSlice'
import { storeNewSession } from '../../features/sessions/sessionsSlice'
import { ExerciseType } from '../../features/exercises/exercisesSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
import ONE_WORKOUT from '../../queries/workouts/getOneWorkout'
import CREATE_SESSION from '../../queries/sessions/createSession'
import Exercise from './Exercise'


interface Props {
  workoutId: string
}

function ShowWorkout({ match }: RouteComponentProps<Props>) {
  const dispatch = useAppDispatch()
  const [createSession] = useMutation(CREATE_SESSION)
  const { workoutId } = match.params

  const [state, setState] = useState({ sessionId: null })
  
  const workouts: WorkoutType[] = useAppSelector(selectAllWorkouts)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)
  
  let currentWorkout: WorkoutType | undefined = workouts.find((workout) => workout.id === workoutId)

  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    skip: !!currentWorkout,
    variables: { token: logintoken, workoutId: workoutId }
  })

  if (data) currentWorkout = data.workout

  if (loading) return <h2>Loading...</h2>

  if (error) {
    console.log('Something went wrong')
    return <Redirect to="/workouts" />
  }
  
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


      <div className="centerContainer marginBottom">
        <button className="button marginRight" onClick={handleCreateSession}>
          Start Session
        </button>

        <button className="button">
          <Link to={`/workouts/${id}/edit`}>Edit Workout</Link>
        </button>
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