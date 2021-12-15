import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { storeCurrentWorkout } from '../../features/workouts/workoutsSlice'
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

// TODO:
// 1. Return session info
// including associated workout data
// ex instances & associated exercies
// 2. Store current session in redux
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
  const sessionId = useAppSelector((state) => state.sessions.currentSession?.id)
  const [redirectToNewSession, setRedirectToNewSession] = useState(false)
  
  const dispatch = useAppDispatch()
  
  const [createSession] = useMutation(CREATE_SESSION)
  
  const { workoutId } = match.params
  
  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    variables: { workoutId: workoutId }
  })
  
  useEffect(() => {
    if (data) dispatch(storeCurrentWorkout(data.workout))
  }, [data, dispatch])

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Something went wrong. Please try again.</h2>
  
  const {
    id,
    name,
    description,
    length,
    location,
    exercises
  } = data.workout


  const handleCreateSession = async () => {
    console.log('called handleCreateSession')

    try {
      console.log('id ==>', id)

      const response = await createSession({ variables: { workoutId: id } })

      const newSession = response.data.createSession

      console.log('newSession ==>', newSession)
      

      // dispatch(storeCurrentSession(newSession))
      dispatch(storeNewSession(newSession))
  
      // 3. redirect to current session page
      setRedirectToNewSession(true)
    } catch(err) {
      console.log('err creating session ==>', err)
    }
  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((ex: any) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }

  if (redirectToNewSession && sessionId) {
    return <Redirect to={`/sessions/${sessionId}`} />
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
        {renderExercises(exercises)}
      </ul>
    </main>
  )
}

export default ShowWorkout