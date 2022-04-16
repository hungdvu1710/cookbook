import { useState } from "react";
import TextInputHolder from "./credentialsUI/TextInputHolder";
import SubmitBtnHolder from "./credentialsUI/SubmitBtnHolder";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleChange = (event) => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(name);
    console.log(email);
    console.log(password);
  };

  return (
    <div className="credential-modal__form">
      <form onSubmit={handleSubmit}>
        <TextInputHolder value={name} placeholder="Enter your Name" onChange={handleChange} label="Name" name="name" type="text"/>
        <TextInputHolder value={email} placeholder="Enter your Email" onChange={handleChange} label="E-Mail Address" name="email" type="email"/>
        <TextInputHolder value={password} placeholder="Enter your Password" onChange={handleChange} label="Password" name="password" type="password"/>
        <SubmitBtnHolder value="Sign Up"/>
      </form>
    </div>
  );
};

export default SignUpForm;
