import { ChangeEvent } from 'react'

interface Props {
  name: string
  labelText: string
  step?: string
  value: string | number | undefined | null
  handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void 
}

function NumberInputGroup(props: Props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.labelText}:</label>
      <input
        type="number"
        name={props.name}
        step={props.step || "1"}
        value={props.value as string}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default NumberInputGroup;