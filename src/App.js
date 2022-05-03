import "./App.css";
import { useState } from "react";
import React from "react";
import Navbar from "./components/LandingPage/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import RecipeCard from "./components/RecipeCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import KitchenPage from "./components/KitchenPage/KitchenPage";

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
  return (
    <ClerkProvider frontendApi={frontendApi}>
      <div>
        <SignedIn>
          <div className="user-button">
            <UserButton />
          </div>
          <Router>
            <div>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/kitchen">
                <KitchenPage />
              </Route>
            </div>
          </Router>
        </SignedIn>

        <SignedOut>
          <Navbar />
          <LandingPage />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}

export default App;
