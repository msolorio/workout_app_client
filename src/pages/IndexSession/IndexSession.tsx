import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks'
import { storeSessions, SessionType } from '../../redux/app/features/sessions/sessionsSlice'
import { selectLoginTokenInRdx } from '../../redux/app/features/auth/authSlice';
import { RootState } from '../../redux/app/store'
import SESSIONS from '../../queries/sessions/getSessions'
import DateWidget from '../../components/DateWidget'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

function IndexSession() {
  const dispatch = useAppDispatch()
  const sessions = useAppSelector((state: RootState) => state.sessions.sessions)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  // TODO: Move to App //////////////////////////////////////////////////////
  const { loading, error, data } = useQuery(SESSIONS, {
    skip: !!sessions.length,
    variables: { token: logintoken }
  })

  useEffect(() => {
    if (data) {
      dispatch(storeSessions(data.sessions))
    }
  })

  if (loading) return <LoadingScreen />
  if (error) return <h2>Something went wrong. Please try again.</h2>
  ///////////////////////////////////////////////////////////////////////////

  const sessionsJSX = sessions.map((session: SessionType) => {
    return (
      <Link to={`/sessions/${session.id}`} key={session.id}>
        <div className="section">
          {/* <h2 className="subHeader">{displayDate}</h2> */}
          <DateWidget timestamp={session.date} />
          <p className="description marginBottomSmall">{session.workout.name}</p>
          <p className="description">{ session.completed ? <span>completed</span> : <span className="accent-text">in-progress</span> }</p>
        </div>
      </Link>
    )
  })

  return (
    <main className="main">
      <h2 className="pageHeader">My Session</h2>
      <ul>{sessionsJSX}</ul>
    </main>
  )
}

export default IndexSession
