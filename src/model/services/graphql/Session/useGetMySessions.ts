import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllSessions } from '../../redux/reduxApi/features/sessions/sessionsSlice'
import { useQuery } from '@apollo/client';

const SESSIONS = gql`
  query Sessions($token: String!) {
    sessions(token: $token) {
      id
      date
      workout {
        id
        name
        description
        length
        location
      }
      completed
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

function useGetMySessions() {
  const token: string = useAppSelector(selectLoginTokenInRdx)
  const sessionsRdx = useAppSelector(selectAllSessions)

  const { data } = useQuery(SESSIONS, {
    skip: !!sessionsRdx.length || !token,
    variables: { token }
  })

  return data?.sessions.length ? data.sessions : sessionsRdx
}

export default useGetMySessions
