import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import TextInputGroup from '../../components/TextInputGroup'
import PasswordInputGroup from '../../components/PasswordInputGroup'
import model from '../../model'

interface State {
  username: string
  password: string
  errorMessage: string
  loggedIn: boolean
}

function Login() {
  const { dataFetchSuccess } = model.App.useInitData()
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


  const handleSubmit = async (testUser: boolean=false) => {
    let { username, password } = state

    if (testUser) {
      username = 'testuser'
      password = '1234'
    }

    const { error } = await loginUser(username, password)

    if (error) {
      return setState({ ...state, errorMessage: error })
    }
    
    if (!error) {
      setState({ ...state, loggedIn: true })
    }
  }


  if (state.loggedIn && dataFetchSuccess) return <Redirect to="/workouts" />

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
