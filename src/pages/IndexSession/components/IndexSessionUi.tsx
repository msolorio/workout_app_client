import { Link } from 'react-router-dom'
import { SessionType } from '../../../model/services/redux/reduxApi/features/sessions/sessionsSlice'
import DateWidget from '../../../components/DateWidget'

interface Props {
  sessions: SessionType[] | null
}

function IndexSessionUi({sessions}: Props): JSX.Element {
  const sessionsJSX = sessions?.map((session: SessionType): React.ReactNode => {
    return (
      <Link to={`/sessions/${session.id}`} key={session.id}>
        <div className="section">
          <DateWidget timestamp={session.date} />
          <p className="description marginBottomSmall">{session.workout.name}</p>
          <p className="description">
            { session.completed ? <span>completed</span> : <span className="accent-text">in-progress</span> }
          </p>
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

export default IndexSessionUi
