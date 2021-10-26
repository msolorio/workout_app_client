function TextInputGroup(props: any) {
  return (
    <div>
      <label htmlFor={props.name}>{props.labelText}:</label>
      {' '}
      <input 
        type="text" 
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default TextInputGroup;