import gql from '../../services/graphql'
import rdx from '../../services/redux'

const Session = {
  useCreateSession() {
    const createSessionGql = gql.Session.useCreateSession()
    const createSessionRdx = rdx.Session.useCreateSession()

    async function createSession(workoutId: string) {
      const createdSession = await createSessionGql(workoutId)
      createSessionRdx(createdSession)
      return createdSession
    }

    return createSession
  },

  useGetMySessions() {
    return rdx.Session.useGetMySessions()
  },

  useGetSessionById(sessionId: string) {
    return rdx.Session.useGetSessionById(sessionId)
  }
}

export default Session
