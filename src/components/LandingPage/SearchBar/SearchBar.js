import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };

  const searchRecipe = async () => {
    let APP_ID = "98817906"
    let API_KEY = "5bdef1c2cd6643063f7313d060069af6"
    let response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + wordEntered + '&app_id=' + APP_ID + '&app_key=' + API_KEY + '&random=true');
    let data = await response.json()
    const { hits } = data
    hits.forEach(hit => {
      const { recipe } = hit
      const { image, label, totalTime, url, mealType} = recipe
      console.log(image, label, totalTime, url, mealType)
    })
    
    return;
  }

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
