import "./App.css";
import { ReactDimmer } from "react-dimmer";
import { useState } from "react";
import React from "react";
import Navbar from "./components/LandingPage/Navbar/Navbar";
import CredentialModal from "./components/LandingPage/CredentialModal";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const [isModalOpen, setModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const signUp = () => {
    setModal(true);
    setIsLogin(false);
  }
  const signIn = () => {
    setModal(true);
    setIsLogin(true);
  }

  return (
    <div>
      <Navbar signUp={signUp} signIn={signIn}/>
      <CredentialModal isLogin={isLogin} isModalOpen={isModalOpen}/>
      <LandingPage />

      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={100}
        blur={1.5}
      />
    </div>
  );
}

export default App;