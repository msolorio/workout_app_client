import gql from '../../services/graphql'
import rdx from '../../services/redux'
import { SessionType } from '../../Types'

const Session = {
  useCreateSession() {
    const createSessionGql = gql.Session.useCreateSession()
    const createSessionRdx = rdx.Session.useCreateSession()

    async function createSession(workoutId: string) {
      const createdSession = await createSessionGql(workoutId)

      if (!createdSession.error) {
        createSessionRdx(createdSession as unknown as SessionType)
      }

      return createdSession
    }

    return createSession
  },

  useGetMySessions() {
    return rdx.Session.useGetMySessions()
  },

  useGetSessionById(sessionId: string) {
    return rdx.Session.useGetSessionById(sessionId)
  },

  useCheckCompleteSession() {
    const completeSessionGql = gql.Session.useCompleteSession()

    return async function checkCompleteSession(session: SessionType) {
      if (session?.completed) await completeSessionGql(session.id)
    }
  }
}

export default Session
