import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeSessions, SessionType } from '../../features/sessions/sessionsSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
import { RootState } from '../../app/store'
import SESSIONS from '../../queries/sessions/getSessions'
import DateWidget from '../../components/DateWidget'


function IndexSession() {
  const dispatch = useAppDispatch()
  const sessions = useAppSelector((state: RootState) => state.sessions.sessions)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  const { loading, error, data } = useQuery(SESSIONS, {
    skip: !!sessions.length,
    variables: { token: logintoken }
  })

  useEffect(() => {
    if (data) {
      dispatch(storeSessions(data.sessions))
    }
  })

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Something went wrong. Please try again.</h2>

  const sessionsJSX = sessions.map((session: SessionType) => {
    return (
      <Link to={`/sessions/${session.id}`} key={session.id}>
        <div className="section">
          {/* <h2 className="subHeader">{displayDate}</h2> */}
          <DateWidget timestamp={session.date} />
          <p className="description">{session.workout.name}</p>
          <p className="description">{ session.completed ? "completed" : "in-progress" }</p>
        </div>
      </Link>
    )
  })

  return (
    <main className="main">
      <h2 className="pageHeader">Session</h2>
      <ul>{sessionsJSX}</ul>
    </main>
  )
}

export default IndexSession
