import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllSessions } from '../../redux/reduxApi/features/sessions/sessionsSlice'
import useHandledQuery from '../utils/useHandledQuery'
import { SessionType } from '../../../Types'

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

function useGetMySessions(): SessionType[] {
  const token: string = useAppSelector(selectLoginTokenInRdx)
  const sessionsRdx = useAppSelector(selectAllSessions)

  const response = useHandledQuery(SESSIONS, {
    skip: !!sessionsRdx.length || !token,
    variables: { token }
  })

  const sessions: SessionType[] = response.sessions || sessionsRdx || []

  return sessions
}

export default useGetMySessions
