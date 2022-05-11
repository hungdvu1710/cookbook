import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };

  const searchRecipe = async () => {
    let APP_ID = "98817906";
    let API_KEY = "5bdef1c2cd6643063f7313d060069af6";
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
      const { image, label, totalTime, url, mealType } = recipe;
      searchResult.push({ image, label, totalTime, url, mealType })
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

      {/* {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <a className="dataItem" href={value.originalURL} target="_blank" rel="noreferrer">
                <p> {value.name} </p>
              </a>
            );
          })}
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
