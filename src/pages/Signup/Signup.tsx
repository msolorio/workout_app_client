import { useState, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import TextInputGroup from '../../components/TextInputGroup'
import PasswordInputGroup from '../../components/PasswordInputGroup'
import model from '../../model'

interface State {
  username: string
  password1: string
  password2: string
  errorMessage: string
  loggedIn: boolean
}

function Signup() {
  model.App.useInitData()
  const signupUser = model.User.signupUser()

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
    if (
      state.username === ''
      || state.password1 === ''
      || state.password2 === ''
    ) {
      return setState({ ...state, errorMessage: 'All fields are required' })
    }

    if (state.password1 !== state.password2) {
      return setState({ ...state, errorMessage: 'Both password fields must match.' })
    }

    const { error, success } = await signupUser(state.username, state.password1)

    if (error) {
      return setState({ ...state, errorMessage: error })
    }

    if (success) {
      return setState({ ...state, loggedIn: true })
    }
  }

  if (state.loggedIn) return <Redirect to="/workouts" />

  return (
    <main className="main">
      <h2 className="pageHeader">Sign Up</h2>
      <p className="description marginBottom alignCenter">Add a username and password to create an account.</p>

      { state.errorMessage && <p className="description_small form-errorMessage">
        {state.errorMessage}
      </p> }
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

        <div className="row_centered">
          <input
            className="button button_accent"
            type="button"
            value="Sign Up"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </main>
  )
}

export default Signup
