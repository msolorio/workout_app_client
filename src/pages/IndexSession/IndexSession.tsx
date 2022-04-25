import { Link } from 'react-router-dom'
import { SessionType } from '../../model/services/redux/features/sessions/sessionsSlice'
import DateWidget from '../../components/DateWidget'
import model from '../../model'

function IndexSession() {
  const sessions = model.Session.useGetMySessions()

  const sessionsJSX = sessions.map((session: SessionType) => {
    return (
      <Link to={`/sessions/${session.id}`} key={session.id}>
        <div className="section">
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
