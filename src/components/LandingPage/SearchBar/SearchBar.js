import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const API_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;

function SearchBar({ placeholder, setSearchResult, setNextLink }) {
  // const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = data.filter((value) => {
    //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
    // });

    // if (searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  const searchRecipeById = async (id) => {
    let response = await fetch(
      "https://api.edamam.com/api/recipes/v2/" +
        id +
        "?type=public&app_id=" +
        APP_ID +
        "&app_key=" +
        API_KEY
    );
    let data = await response.json();
    const { recipe } = data;
    console.log(recipe)
    return;
  }

  const searchRecipe = async () => {
    let response = await fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        wordEntered +
        "&app_id=" +
        APP_ID +
        "&app_key=" +
        API_KEY
    );
    let data = await response.json();
    const { hits, _links } = data;
    const searchResult = [];
    if (Object.keys(_links).length !== 0) {
      const { next } = _links
      setNextLink(next.href)
    } else {
      setNextLink(null)
    }
    
    hits.forEach((hit) => {
      const { recipe } = hit;
      const { image, label, totalTime, url, mealType, uri } = recipe;
      const id = uri.slice(uri.indexOf('recipe_'))
      searchResult.push({ image, label, totalTime, url, mealType, id })
    });
    console.log(searchResult)
    setSearchResult(searchResult)
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
        <button className="searchIcon" onClick={searchRecipe}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
