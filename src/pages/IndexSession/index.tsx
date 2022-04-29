import IndexSessionUi from './components/IndexSessionUi'
import { SessionType } from '../../model/services/redux/reduxApi/features/sessions/sessionsSlice'
import model from '../../model'

function IndexSession(): JSX.Element {
  const sessions: SessionType[] = model.Session.useGetMySessions()

  return (
    <IndexSessionUi sessions={sessions} />
  )
}

export default IndexSession