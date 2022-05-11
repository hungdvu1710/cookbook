import "./LandingPage.css";
import SearchBar from "./SearchBar/SearchBar";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import RecipeCard from "../RecipeCard";
import { Button } from "@mui/material";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

const LandingPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [nextLink, setNextLink] = useState(null);
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

  const getNextRecipes = async () => {
    let response = await fetch(nextLink);
    let data = await response.json();
    const { hits, _links } = data;
    let result = searchResult;
    if (Object.keys(_links).length !== 0) {
      const { next } = _links
      setNextLink(next.href)
    } else {
      setNextLink(null)
    }
    hits.forEach((hit) => {
      const { recipe } = hit;
      const { image, label, totalTime, url, mealType } = recipe;
      result.push({ image, label, totalTime, url, mealType })
    });
    setSearchResult(result)
    return;
  }

  return (
    <div>
      <SearchBar placeholder="Start browsing for recipes!" setSearchResult={setSearchResult} setNextLink={setNextLink} />
      {
        searchResult.map(result => {
          return <RecipeCard recipe={result} key={result.url}/>
        })
      }
      {
        nextLink ? <Button className="landing-page__pagination-btn" variant="contained" onClick={getNextRecipes}> NEXT </Button> : ''
      }
    </div>
  );
};

export default LandingPage;
