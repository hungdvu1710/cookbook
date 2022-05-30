import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "@clerk/clerk-react";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;
const EDAMAM_CREDENTIALS = [
  {
    APP_ID: process.env.REACT_APP_EDAMAM_APP_ID,
    API_KEY: process.env.REACT_APP_EDAMAM_APP_KEY,
  },
  {
    APP_ID: process.env.REACT_APP_EDAMAM_APP_ID2,
    API_KEY: process.env.REACT_APP_EDAMAM_APP_KEY2,
  },
  {
    APP_ID: process.env.REACT_APP_EDAMAM_APP_ID3,
    API_KEY: process.env.REACT_APP_EDAMAM_APP_KEY3,
  },
  {
    APP_ID: process.env.REACT_APP_EDAMAM_APP_ID4,
    API_KEY: process.env.REACT_APP_EDAMAM_APP_KEY4,
  },
];

function SearchBar({
  placeholder,
  setSearchResult,
  setNextLink,
  setSavedRecipe,
}) {
  const { isSignedIn, user } = useUser();
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  const searchRecipe = async (index) => {
    let data = await fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        wordEntered +
        "&app_id=" +
        EDAMAM_CREDENTIALS[index].APP_ID +
        "&app_key=" +
        EDAMAM_CREDENTIALS[index].API_KEY
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
    if (!data) {
      return searchRecipe((index + 1)%EDAMAM_CREDENTIALS.length)
    }
    const { hits, _links } = data;
    const searchResult = [];
    if (Object.keys(_links).length !== 0) {
      const { next } = _links;
      setNextLink(next.href);
    } else {
      setNextLink(null);
    }

    hits.forEach((hit) => {
      const { recipe } = hit;
      const {
        image,
        label,
        totalTime,
        url,
        mealType,
        uri,
        cautions,
        cuisineType,
        dietLabels,
        ingredientLines,
        calories,
      } = recipe;
      const id = uri.slice(uri.indexOf("recipe_"));
      searchResult.push({
        image,
        label,
        totalTime,
        url,
        mealType,
        id,
        cautions,
        cuisineType,
        dietLabels,
        ingredientLines,
        calories,
      });
    });

    if (isSignedIn) {
      //send userData to BE
      const { id } = user;
      await fetch(BE_HOST + "api/recipes?id=" + id, {})
        .then((response) => response.json())
        .then((data) => {
          setSavedRecipe(data);
        });
    }

    setSearchResult(searchResult);
    return;
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <button className="searchIcon" onClick={() => {searchRecipe(0)}}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
