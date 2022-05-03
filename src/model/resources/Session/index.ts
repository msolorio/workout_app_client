import gql from '../../services/graphql'
import rdx from '../../services/redux'
import { SessionType } from '../../Types'
import { SessionOrErrorType } from '../../Types'

const Session = {
  useCreateSession() {
    const createSessionGql = gql.Session.useCreateSession()
    const createSessionRdx = rdx.Session.useCreateSession()

    async function createSession(workoutId: string): Promise<SessionOrErrorType> {
      const response = await createSessionGql(workoutId)

      if (!response.error) {
        createSessionRdx(response)
      }

      return response
    }

    return createSession
  },

  useGetMySessions(): SessionType[] | null {
    return rdx.Session.useGetMySessions()
  },

  useGetSessionById(sessionId: string): SessionType | undefined {
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
