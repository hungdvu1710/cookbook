import "./TextInputHolder.css";

const TextInputHolder = (props) => {
  return (
    <div className="text-input-holder">
      <label className="text-input-holder__label" htmlFor={`${props.name}`}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.name}
        className="text-input-holder__input"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextInputHolder