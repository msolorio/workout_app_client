import { ChangeEvent } from 'react'

interface Props {
  name: string
  labelText: string
  value: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void 
}

function PasswordInputGroup(props: Props) {
  return (
    <div className="form-group-col">
      <label 
        className="form-label" 
        htmlFor={props.name}
      >
        {props.labelText}:
      </label>
      <input 
        className="form-input"
        type="password" 
        name={props.name}
        value={props.value as string}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default PasswordInputGroup;