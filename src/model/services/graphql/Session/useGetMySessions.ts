import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllSessions } from '../../redux/reduxApi/features/sessions/sessionsSlice'
import useHandledQuery from '../utils/useHandledQuery'
import { SessionType } from '../../../Types'

const SESSIONS = gql`
  query Sessions {
    sessions {
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

function useGetMySessions(): SessionType[] | null {
  const sessionsRdx = useAppSelector(selectAllSessions)
  const loggedInStatus = useAppSelector(selectLoginTokenInRdx)

  const response = useHandledQuery(SESSIONS, {
    skip: !loggedInStatus || !!sessionsRdx,
    variables: {}
  })

  const sessions = response.sessions || null

  return sessions
}

export default useGetMySessions
