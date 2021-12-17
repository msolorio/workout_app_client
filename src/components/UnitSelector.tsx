import { ChangeEventHandler } from 'react'

interface Props {
  handleInputChange: ChangeEventHandler<HTMLSelectElement>
  value: string
  name: string
}

function UnitSelector(props: Props) {
  return (
    <select
      name={props.name}
      onChange={props.handleInputChange}
      value={props.value || ""}
    >
      <option value="lbs">lbs</option>
      <option value="kg">kg</option>
    </select>
  )
}

export default UnitSelector