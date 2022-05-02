import "./LandingPage.css";
import RecipeData from "../Data.json";
import SearchBar from "./SearchBar/SearchBar";
import { useUser } from "@clerk/clerk-react";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

// fetch(BE_HOST + "/api/recipes", {
//   body: JSON.stringify(userData),
//   cache: "no-cache",
//   mode: "cors",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const LandingPage = () => {
  const { isSignedIn, user } = useUser();
  if (isSignedIn) {
    //send userData to BE
    const { primaryEmailAddress, id } = user;
    const userData = {
      email: primaryEmailAddress.emailAddress,
      id: id,
    };
    fetch(BE_HOST + "/api/user", {
      body: JSON.stringify(userData),
      cache: "no-cache",
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div>
      {/** 
      Signup and Login Buttons
      Create your own components for Sign up and Login buttons Then add them
      to this section You can add to the LandingPage.css file for styling 
      
      
      */}

      {
        //Logo
      }
      <SearchBar placeholder="Start browsing for recipes!" data={RecipeData} />
      {
        //Recipe Search Bar
      }
    </div>
  );
};

export default LandingPage;
