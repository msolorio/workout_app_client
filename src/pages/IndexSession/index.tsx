import IndexSessionUi from './components/IndexSessionUi'
import model from '../../model'

function IndexSession(): JSX.Element {
  const sessions = model.Session.useGetMySessions()

  return (
    <IndexSessionUi sessions={sessions} />
  )
}

export default IndexSession