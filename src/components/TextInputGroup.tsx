import { ChangeEvent } from 'react'

interface Props {
  name: string
  labelText: string
  value: string | number | undefined | null
  handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void 
}

function TextInputGroup(props: Props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.labelText}:</label>
      {' '}
      <input 
        type="text" 
        name={props.name}
        value={props.value as string}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default TextInputGroup;