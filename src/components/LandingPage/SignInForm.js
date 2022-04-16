import { useState } from "react";
import TextInputHolder from "./credentialsUI/TextInputHolder";
import SubmitBtnHolder from "./credentialsUI/SubmitBtnHolder";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event) => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(email);
    console.log(password);
  };

  return (
    <div className="credential-modal__form">
      <form onSubmit={handleSubmit}>
        <TextInputHolder value={email} placeholder="Enter your Email" onChange={handleChange} label="E-Mail Address" name="email" type="email"/>
        <TextInputHolder value={password} placeholder="Enter your Password" onChange={handleChange} label="Password" name="password" type="password"/>
        <SubmitBtnHolder value="Sign In"/>
      </form>
    </div>
  );
};

export default SignInForm;
