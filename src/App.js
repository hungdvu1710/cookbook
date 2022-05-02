import "./App.css";
import { ReactDimmer } from "react-dimmer";
import { useState } from "react";
import React from "react";
import Navbar from "./components/LandingPage/Navbar/Navbar";
import CredentialModal from "./components/LandingPage/CredentialModal";
import LandingPage from "./components/LandingPage/LandingPage";
import RecipeCard from "./components/RecipeCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

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
      <Navbar signUp={signUp} signIn={signIn} />
      <CredentialModal isLogin={isLogin} isModalOpen={isModalOpen} />
      <Container>
        <LandingPage />
        <Grid container spacing={5}>
          {/* <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard /> */}
        </Grid>
      </Container>

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