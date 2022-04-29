import { ChangeEvent } from 'react'
import TextInputGroup from '../../../components/form/TextInputGroup'
import PasswordInputGroup from '../../../components/form/PasswordInputGroup'

interface Props {
  username: string
  password: string
  errorMessage: string
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
  ) => void 
  handleSubmit: (testUser: boolean) => void
}

function LoginUi({
  username,
  password,
  errorMessage,
  handleInputChange,
  handleSubmit
}: Props): JSX.Element {

  return (
    <main className="main">
      <h2 className="pageHeader">Log In</h2>
      { 
        errorMessage && <p className="description_small form-errorMessage">
          {errorMessage}
        </p> 
      }
      <form>
        <TextInputGroup
          name="username"
          labelText="username"
          value={username}
          handleChange={handleInputChange}
        />

        <PasswordInputGroup
          name="password"
          labelText="password"
          value={password}
          handleChange={handleInputChange}
        />

        <span className="row_centered">
          <input
            className="button button_standard marginRight"
            type="button"
            value="Log In"
            onClick={() => handleSubmit(false)}
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

export default LoginUi
