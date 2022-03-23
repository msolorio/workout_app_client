import { ChangeEvent } from 'react'

interface Props {
  name: string
  labelText: string
  value: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void 
}

function PasswordInputGroup(props: Props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.labelText}:</label>
      {' '}
      <input 
        type="password" 
        name={props.name}
        value={props.value as string}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default PasswordInputGroup;