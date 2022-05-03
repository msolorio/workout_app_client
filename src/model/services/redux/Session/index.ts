import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import {
  storeSessions,
  storeNewSession,
  selectAllSessions,
  selectSessionById,
  removeSessions
} from '../reduxApi/features/sessions/sessionsSlice'
import { SessionType } from '../../../Types'

const Session = {
  useCreateSession() {
    const dispatch = useAppDispatch()

    return function createSession(createdSession: SessionType) {
      dispatch(storeNewSession(createdSession))
    }
  },

  useGetMySessions() {
    return useAppSelector(selectAllSessions)
  },

  useGetSessionById(sessionId: string) {
    return useAppSelector(selectSessionById(sessionId))
  },

  useStoreSessions() {
    const dispatch = useAppDispatch()

    return function storeSessionsRdx(sessions: SessionType[]) {
      dispatch(storeSessions(sessions))
    }
  },

  useRemoveSessions() {
    const dispatch = useAppDispatch()

    return function removeSessionsRdx() {
      dispatch(removeSessions())
    }
  }
}

export default Session
