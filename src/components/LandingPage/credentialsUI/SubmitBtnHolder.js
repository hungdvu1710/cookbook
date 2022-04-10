import "./SubmitBtnHolder.css";

const SubmitBtnHolder = (props) => {
  return (
    <div className="submit-btn-holder">
      <button className="submit-btn-holder__btn">{props.value}</button>
    </div>
  );
};

export default SubmitBtnHolder;
