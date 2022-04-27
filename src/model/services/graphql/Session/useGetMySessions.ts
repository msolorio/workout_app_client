import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client';
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllSessions } from '../../redux/reduxApi/features/sessions/sessionsSlice'
import { DEFAULT_ERROR } from '../../../../utils/defaultError'

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

  const { data, error } = useQuery(SESSIONS, {
    skip: !!sessionsRdx.length || !token,
    variables: { token }
  })

  if (error) return { error: DEFAULT_ERROR }

  const sessions = data?.sessions || sessionsRdx || null

  return { sessions }
}

export default useGetMySessions
