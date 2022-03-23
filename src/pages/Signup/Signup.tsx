import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import TextInputGroup from '../../components/TextInputGroup'
import PasswordInputGroup from '../../components/PasswordInputGroup'
import SIGNUP_USER from '../../queries/users/signupUser'

interface State {
  username: string
  password1: string
  password2: string
  errorMessage: string
  redirectToLogin: boolean
}

function Signup() {
  const stateObj: State = {
    username: '',
    password1: '',
    password2: '',
    errorMessage: '',
    redirectToLogin: false
  }
  const [state, setState] = useState(stateObj)

  const [signup] = useMutation(SIGNUP_USER)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }



  const handleSubmit = async () => {
    if (
      state.username === ''
      || state.password1 === ''
      || state.password2 === ''
    ) {
      setState({ ...state, errorMessage: 'All fields are required' })
      return
    }

    if (state.password1 !== state.password2) {
      setState({ ...state, errorMessage: 'Both password fields must match.'})
      return
    }

    try {
      const response = await signup({
        variables: {
          username: state.username,
          password: state.password1
        }
      })

      // setSessionToken(response.data.signup.token)

      setState({ ...state, redirectToLogin: true })


    } catch (err) {
      console.error('There was an error signing up.')
    }
  }

  if (state.redirectToLogin) return <Redirect to="/login" />

  return (
    <main>
      <h2>Sign Up</h2>
      <p>Add a username and password to create an account.</p>
      <form action="">
        <TextInputGroup
          name="username"
          labelText="username"
          value={state.username}
          handleChange={handleInputChange}
        />

        <PasswordInputGroup
          name="password1"
          labelText="password"
          value={state.password1}
          handleChange={handleInputChange}
        />

        <PasswordInputGroup
          name="password2"
          labelText="enter password again"
          value={state.password2}
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

export default Signup
