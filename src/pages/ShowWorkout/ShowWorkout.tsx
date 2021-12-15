import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { WorkoutType } from '../../features/workouts/workoutsSlice'
import { storeNewSession } from '../../features/sessions/sessionsSlice'
import Exercise from './Exercise'
import { ExerciseType } from '../../features/exercises/exercisesSlice'

const ONE_WORKOUT = gql`
  query GetOneWorkout($workoutId: ID!) {
    workout(id: $workoutId) {
      id
      name
      description
      length
      location
      exercises {
        id
        name
        reps
        sets
        weight
        unit
      }
    }
  }
`

const CREATE_SESSION = gql`
mutation CreateSessionMutation($workoutId: ID!) {
  createSession(workoutId: $workoutId) {
    id
    date
    workout {
      id
      name
      description
      length
      location
    }
    exerciseInstances {
      id
      exercise {
        id
        name
        reps
        sets
        weight
        unit
      }
      setsCompleted
      repsCompleted
    }
  }
}
`

interface Props {
  workoutId: string
}

function ShowWorkout({ match }: RouteComponentProps<Props>) {
  const dispatch = useAppDispatch()
  const [createSession] = useMutation(CREATE_SESSION)
  const { workoutId } = match.params

  const [state, setState] = useState({ sessionId: null })
  
  const workouts: WorkoutType[] = useAppSelector((state: RootState) => state.workouts.workouts)
  
  let currentWorkout: WorkoutType | undefined = workouts.find((workout) => workout.id === workoutId)
  
console.log('currentWorkout ==>', currentWorkout)


  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    skip: !!currentWorkout,
    variables: { workoutId: workoutId }
  })

  if (data) currentWorkout = data.workout

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Something went wrong. Please try again.</h2>
  
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
      const response = await createSession({ variables: { workoutId: id } })
      const newSession = response.data.createSession
  
      dispatch(storeNewSession(newSession))
  
      setState({ sessionId: newSession.id })
    } catch(err) {
      console.log('err creating session ==>', err)
    }
  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((ex: any) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }

  if (state.sessionId) {
    return <Redirect to={`/sessions/${state.sessionId}`} />
  }

  return (
    <main>
      <h2>{name}</h2>

      { length && <p>{length} minutes</p> }

      { location && <p>{location}</p> }

      <button onClick={handleCreateSession}>
        Create Session
      </button>

      { description && <p>{description}</p> }

      <ul>
        {renderExercises(exercises as ExerciseType[])}
      </ul>
    </main>
  )
}

export default ShowWorkout