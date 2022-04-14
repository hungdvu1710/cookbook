import "./App.css";


import React from "react";
import Navbar from "./components/LandingPage/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/LandingPage/pages/signup";
import SignIn from "./components/LandingPage/pages/signin";
import Home from "./components/LandingPage/pages/index";

import SearchBar from "./components/LandingPage/SearchBar/SearchBar";
import RecipeData from "./components/Data.json";

function App() {
  return (
    
    <Router>
      <Navbar />
      <Switch>
        <Route path="/Home" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>

      <SearchBar placeholder="Start browsing for recipes!"
      data = {RecipeData}
      />

    </Router>
  );

}


export default App;

/** 
 * 
 * import LandingPage from "./components/LandingPage/LandingPage";

      const App = () => {
  return <div className="App">
    <LandingPage />
    
    <Navbar/>
  </div>;
      };
      
      */
