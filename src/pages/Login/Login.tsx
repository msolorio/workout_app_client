import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import TextInputGroup from '../../components/TextInputGroup'
import PasswordInputGroup from '../../components/PasswordInputGroup'
import { setLoginToken } from '../../utils/authUtils'
import LOGIN_USER from '../../queries/users/loginUser'

interface State {
  username: string
  password: string
  errorMessage: string
  redirectToWorkouts: boolean
}

interface Props {
  setSessionToken: (token: string) => void
}

function Login({ setSessionToken }: Props) {
  const stateObj: State = {
    username: '',
    password: '',
    errorMessage: '',
    redirectToWorkouts: false
  }

  const [state, setState] = useState(stateObj)

  const [login] = useMutation(LOGIN_USER)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    if (
      state.username === ''
      || state.password === ''
    ) {
      setState({ ...state, errorMessage: 'All fields are required' })
      return
    }

    try {
      const response = await login({
        variables: {
          username: state.username,
          password: state.password
        }
      })

      setState({
        ...state,
        username: '',
        password: '',
        errorMessage: ''
      })

      setSessionToken(response.data.login.token)

      setState({
        ...state,
        redirectToWorkouts: true
      })

    } catch (err) {
      console.error('There was an error logging in.')
    }
  }

  if (state.redirectToWorkouts) return <Redirect to="/workouts" />

  return (
    <main>
      <h2>Log In</h2>
      <form action="">
        <TextInputGroup
          name="username"
          labelText="username"
          value={state.username}
          handleChange={handleInputChange}
        />

        <PasswordInputGroup
          name="password"
          labelText="password"
          value={state.password}
          handleChange={handleInputChange}
        />

        <input
          type="button"
          value="Sign Up"
          onClick={handleSubmit}
        />
      </form>
    </main>
  )
}

export default Login
