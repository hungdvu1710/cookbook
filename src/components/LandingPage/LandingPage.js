import "./LandingPage.css";
import RecipeData from "../Data.json"; 
import SearchBar from "./SearchBar/SearchBar";

const LandingPage = () => {
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
