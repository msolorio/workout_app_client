import { ChangeEvent } from 'react'
import TextInputGroup from '../../../components/form/TextInputGroup'
import PasswordInputGroup from '../../../components/form/PasswordInputGroup'

interface Props {
  username: string
  password1: string
  password2: string
  errorMessage: string
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
  ) => void
  handleSubmit: () => void
}


function Signup({
  username,
  password1,
  password2,
  errorMessage,
  handleInputChange,
  handleSubmit
}: Props): JSX.Element {
  return (
    <main className="main">
      <h2 className="pageHeader">Sign Up</h2>
      <p className="description marginBottom alignCenter">Add a username and password to create an account.</p>

      { errorMessage && <p className="description_small form-errorMessage">
        {errorMessage}
      </p> }
      <form action="">
        <TextInputGroup
          name="username"
          labelText="username"
          value={username}
          handleChange={handleInputChange}
        />

        <PasswordInputGroup
          name="password1"
          labelText="password"
          value={password1}
          handleChange={handleInputChange}
        />

        <PasswordInputGroup
          name="password2"
          labelText="enter password again"
          value={password2}
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
