import { ChangeEvent } from 'react'

interface Props {
  name: string
  labelText: string
  value: string | number | undefined | null
  placeholder?: string | undefined
  handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void 
}

function TextInputGroup(props: Props): JSX.Element {
  return (
    <div className="form-group-col">
      <label 
        className="form-label" 
        htmlFor={props.name}
      >
        {props.labelText}:
      </label>
      <input 
        placeholder={props.placeholder}
        className="form-input"
        type="text" 
        name={props.name}
        value={props.value as string}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default TextInputGroup;