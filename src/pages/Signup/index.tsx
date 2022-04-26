import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import model from '../../model'
import SignupUi from './components/SignupUi'

interface State {
  username: string
  password1: string
  password2: string
  errorMessage: string
  loggedIn: boolean
}

function Signup() {
  model.App.useInitData()
  const signupUser = model.User.useSignupUser()

  const stateObj: State = {
    username: '',
    password1: '',
    password2: '',
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


  const handleSubmit = async () => {
    const { username, password1, password2 } = state
    const args = { username, password1, password2 }

    const { error } = await signupUser(args)

    if (error) {
      return setState({ ...state, errorMessage: error })
    }

    if (!error) {
      return setState({ ...state, loggedIn: true })
    }
  }


  if (state.loggedIn) return <Redirect to="/workouts" />

  return (
    <SignupUi
      username={state.username}
      password1={state.password1}
      password2={state.password2}
      errorMessage={state.errorMessage}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default Signup
