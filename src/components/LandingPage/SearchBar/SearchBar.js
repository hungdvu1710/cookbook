import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Stack from '@mui/material/Stack';
import AllergenSelect from '/home/djli/cookbook/src/components/LandingPage/SearchBar/AllergenSelect.js';
import getHTagName from '/home/djli/cookbook/src/components/LandingPage/SearchBar/AllergenSelect.js';
import CuisineType from '/home/djli/cookbook/src/components/LandingPage/SearchBar/CuisineType.js';
import getCTagName from '/home/djli/cookbook/src/components/LandingPage/SearchBar/CuisineType.js';
import MealType from '/home/djli/cookbook/src/components/LandingPage/SearchBar/MealType.js';
import getMTagName from '/home/djli/cookbook/src/components/LandingPage/SearchBar/MealType.js';
import DishType from '/home/djli/cookbook/src/components/LandingPage/SearchBar/DishType.js';
import getDTagName from '/home/djli/cookbook/src/components/LandingPage/SearchBar/DishType.js';
import FilterCleaner from '/home/djli/cookbook/src/components/LandingPage/SearchBar/FilterCleaner.js';

function SearchBar({ placeholder, setSearchResult, setNextLink }) {
  // const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [userExclude, setUserExclude] = useState("");

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
  const noHandleFilter = (event) => {
    const noSearchWord = event.target.value;
    setUserExclude(noSearchWord);
  }

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };

  //Example search to help understand structure:
  //https://api.edamam.com/api/recipes/v2?type=public&q=salad&app_id=98817906&app_key=5bdef1c2cd6643063f7313d060069af6
  //&diet=high-protein&diet=low-fat&diet=low-sodium
  //&health=pork-free&health=vegetarian
  //&cuisineType=Asian&cuisineType=Chinese
  //&mealType=Dinner&mealType=Lunch
  //&dishType=Main%20course&dishType=Side%20dish
  //&excluded=lettuce&excluded=tomato
  //Randomized search my beloved :(
  //&random=true


  const searchRecipe = async () => {
    let APP_ID = "98817906";
    let API_KEY = "5bdef1c2cd6643063f7313d060069af6";
    let response = await fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
      wordEntered +
      "&app_id=" +
      APP_ID +
      "&app_key=" +
      API_KEY +
      //health
      (getHTagName() ? "&health=" + FilterCleaner(getHTagName(), "&health=") : '') +
      //cuisine
      (getCTagName() ? "&cuisineType=" + FilterCleaner(getCTagName(), "&cuisineType=") : '') +
      //meal
      (getMTagName() ? "&mealType=" + FilterCleaner(getMTagName(), "&mealType=") : '') +
      //dish
      (getDTagName() ? "&dishType=" + FilterCleaner(getDTagName(), "&dishType=") : '') +
      //exclude
      (userExclude ? "&excluded=" + FilterCleaner(userExclude, "&excluded=") : '')

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
      <Stack spacing={2}>
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
        <div>
          <input
            type="text"
            placeholder={'Ingredient to exclude?'}
            value={userExclude}
            onChange={noHandleFilter}
          />
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <AllergenSelect />
            <CuisineType />
          </Stack>
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <MealType />
            <DishType />
          </Stack>
        </div>
      </Stack>

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
