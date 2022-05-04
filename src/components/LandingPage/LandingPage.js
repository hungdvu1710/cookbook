import "./LandingPage.css";
import SearchBar from "./SearchBar/SearchBar";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import RecipeCard from "../RecipeCard";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

const LandingPage = () => {
  const [searchResult, setSearchResult] = useState([]);
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
      <SearchBar placeholder="Start browsing for recipes!" setSearchResult={setSearchResult} />
      {
        searchResult.map(result => {
          return <RecipeCard recipe={result} key={result.url}/>
        })
      }
    </div>
  );
};

export default LandingPage;
