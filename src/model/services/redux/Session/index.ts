import { useAppDispatch, useAppSelector } from '../app/hooks'
import { storeNewSession, selectAllSessions, selectSessionById } from '../features/sessions/sessionsSlice'
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
  }
}

export default Session
