import React, { useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { storeCurrentWorkout } from '../../features/workouts/workoutsSlice'
import { storeCurrentSession } from '../../features/sessions/sessionsSlice'
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


  const handleStartClick = async () => {
    console.log('called handleStartClick')

    // 1. make graphql query to create session
    // passing in workoutId

    try {
      const response = await createSession({ variables: { workoutId: id } })

      console.log('response ==>', response)
      // 2. store current session in redux
      const newSession = response.data.createSession;
      dispatch(storeCurrentSession(newSession))
  
      // 3. redirect to current session page
    } catch(err) {
      console.log('err creating session ==>', err)
    }


  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((ex: any) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }

  return (
    <main>
      <h2>{name}</h2>


      { length && <p>{length} minutes</p> }

      { location && <p>{location}</p> }

      <button onClick={handleStartClick}>
        Start
      </button>

      { description && <p>{description}</p> }

      <ul>
        {renderExercises(exercises)}
      </ul>
    </main>
  )
}

export default ShowWorkout