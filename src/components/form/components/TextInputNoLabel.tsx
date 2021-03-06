import { ChangeEventHandler } from 'react'

interface Props {
  name: string
  placeholder: string
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}

function TextInputNoLabel(props: Props): JSX.Element {
  return (
    <div>
      <input 
        className="form-input"
        type="text" 
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default TextInputNoLabel;
