import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import LoginUi from './components/LoginUi'
import model from '../../model'

interface State {
  username: string
  password: string
  errorMessage: string
  loggedIn: boolean
}

function Login(): JSX.Element {
  // let dataFetchSuccess
  model.App.useInitData()
  const loginUser = model.User.useLoginUser()

  const stateObj: State = {
    username: '',
    password: '',
    errorMessage: '',
    loggedIn: false
  }
  const [state, setState] = useState(stateObj)


  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }


  const handleSubmit = async (testUser: boolean) => {
    let { username, password } = state
  
    if (testUser) {
      username = 'testuser'
      password = '1234'
    }

    const { error } = await loginUser(username, password)

    if (error) {
      setState({ ...state, errorMessage: error })
    }
    if (!error) {
      setState({ ...state, loggedIn: true })
    }
  }


  if (state.loggedIn) return <Redirect to="/workouts" />

  return (
    <LoginUi
      username={state.username}
      password={state.password}
      errorMessage={state.errorMessage}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default Login
