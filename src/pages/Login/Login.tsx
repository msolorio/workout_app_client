import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { useAppDispatch } from '../../app/hooks'
import { storeLoginTokenInRdx } from '../../features/auth/authSlice'
import TextInputGroup from '../../components/TextInputGroup'
import PasswordInputGroup from '../../components/PasswordInputGroup'
import { setLoginTokenInLocalStorage } from '../../utils/authUtils'
import LOGIN_USER from '../../queries/users/loginUser'

interface State {
  username: string
  password: string
  errorMessage: string
  redirectToWorkouts: boolean
}

function Login() {
  const stateObj: State = {
    username: '',
    password: '',
    errorMessage: '',
    // TODO: move to custom hook
    redirectToWorkouts: false
  }

  const [state, setState] = useState(stateObj)

  // TODO: move to custom hook
  const [login] = useMutation(LOGIN_USER)
  const dispatch = useAppDispatch()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (testUser: boolean=false) => {


    // Clean up - set username and password in state if testUser flag is true
    if (
      !testUser
      && (state.username === '' || state.password === '')
    ) {
      return setState({ ...state, errorMessage: 'All fields are required' })
    }

    // TODO:
    // - Create higher order function for error handling
    // - Use everywhere we make a query
    try {
      // TODO: GraphQL - Move to custom hook
      const response = await login({
        variables: {
          username: testUser ? 'testuser' : state.username,
          password: testUser ? '1234' : state.password
        }
      })

      if (response.data.login.error) {
        return setState({ ...state, errorMessage: response.data.login.error })
      }
      

      setState({
        ...state,
        username: '',
        password: '',
        errorMessage: ''
      })

      // TODO: Setting local storage - Move to custom hook
      const loginToken = response.data.login.token
      setLoginTokenInLocalStorage(loginToken)

      // TODO: Redux - Move to custom hook
      dispatch(storeLoginTokenInRdx(loginToken))

      setState({
        ...state,
        redirectToWorkouts: true
      })

    } catch (err) {
      console.error('There was an error logging in.')
      console.log('err ==>', err)
      
    }
  }

  if (state.redirectToWorkouts) return <Redirect to="/workouts" />

  return (
    <main className="main">
      <h2 className="pageHeader">Log In</h2>

      { 
        state.errorMessage && <p className="description_small form-errorMessage">
          {state.errorMessage}
        </p> 
      }
      <form>
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

        <span className="row_centered">
          <input
            className="button button_standard marginRight"
            type="button"
            value="Log In"
            onClick={() => handleSubmit()}
          />

          <input
            className="button button_accent"
            type="button"
            value="Log In as Test User"
            onClick={() => handleSubmit(true)}
          />
        </span>
      </form>
    </main>
  )
}

export default Login
