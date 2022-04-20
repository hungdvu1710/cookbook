import "./App.css";
import { useState } from "react";
import React from "react";
import Navbar from "./components/LandingPage/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const signUp = () => {
    setRegister(true);
  };
  const signIn = () => {
    setLogin(true);
  };

  return (
    <ClerkProvider frontendApi={frontendApi}>
      <div>
        <SignedIn>
          <div className="user-button">
            <UserButton />
          </div>
          <LandingPage />
        </SignedIn>

        <SignedOut>
          <Navbar signUp={signUp} signIn={signIn} />
          <LandingPage />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}

export default App;
