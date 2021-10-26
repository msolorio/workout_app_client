function NumberInputGroup(props: any) {
  return (
    <div>
      <label htmlFor={props.name}>{props.labelText}:</label>
      <input
        type="number"
        name={props.name}
        step={props.step || "1"}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default NumberInputGroup;