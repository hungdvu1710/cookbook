import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import "./CredentialModal.css";

const CredentialModal = (props) => {
  return (
    <div className={`credential-modal ${props.isModalOpen ? "open" : ""}`}>
      <div className="credential-modal__container">
        {props.isLogin ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default CredentialModal;
