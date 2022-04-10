import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import "./CredentialModal.css";

const CredentialModal = () => {
  const [isLogin, setIsLogin] = useState(true); // if true then login, else is signup
  return (
    <div className="credential-modal">
      <div className="credential-modal__container">
        <button className={`credential-modal__btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>Sign In</button>
        <button className={`credential-modal__btn ${isLogin ? "" : "active"}`} onClick={() => setIsLogin(false)}>Sign Up</button>
        {isLogin ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default CredentialModal;
