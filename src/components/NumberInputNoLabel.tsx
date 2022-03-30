import { ChangeEventHandler } from 'react'

interface Props {
  name: string
  step?: number
  value: string | number | undefined | null
  placeholder?: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}

function NumberInputNoLabel(props: Props) {
  return (
    <input
      className="form-numInput"
      type="number"
      placeholder={props.placeholder || "type here"}
      name={props.name}
      step={props.step || "1"}
      value={props.value || ""}
      onChange={props.handleChange}
    />
  )
}

export default NumberInputNoLabel
