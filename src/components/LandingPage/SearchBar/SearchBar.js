import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import AllergenSelect from "./AllergenSelect";
import CuisineType from "./CuisineType";
import getCTagName from "./CuisineType";
import MealType from "./MealType";
import DishType from "./DishType";
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
  {
    APP_ID: process.env.REACT_APP_EDAMAM_APP_ID5,
    API_KEY: process.env.REACT_APP_EDAMAM_APP_KEY5,
  },
  {
    APP_ID: process.env.REACT_APP_EDAMAM_APP_ID6,
    API_KEY: process.env.REACT_APP_EDAMAM_APP_KEY6,
  },
];

const MAX_NUM_TRY = 10;

function SearchBar({
  placeholder,
  setSearchResult,
  setNextLink,
  setSavedRecipe,
}) {
  const { isSignedIn, user } = useUser();
  const [wordEntered, setWordEntered] = useState("");
  const [userExclude, setUserExclude] = useState("");
  const [cTagName, setCTagName] = useState([]);
  const [dTagName, setDTagName] = useState([]);
  const [mTagName, setMTagName] = useState([]);
  const [hTagName, setHTagName] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };
  const noHandleFilter = (event) => {
    const noSearchWord = event.target.value;
    setUserExclude(noSearchWord);
  };

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
  const FilterCleaner = (uncleaned, searchType) => {
    console.log(uncleaned);
    let cleaned = "";
    for (let i = 0; i < uncleaned.length; i++) {
      if (uncleaned[i] == " ") {
        cleaned += "%20";
      }
      if (uncleaned[i] == ",") {
        cleaned += searchType;
        i++;
      } else {
        cleaned += uncleaned[i];
      }
    }
    return cleaned;
  };

  const concatFilter = (filter, searchType) => {
    const lowerCaseFilter = filter.map((element) => {
      return element.toLowerCase();
    });
    return lowerCaseFilter.join(searchType);
  };

  const searchRecipe = async (index, numTry) => {
    let data = await fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        wordEntered +
        "&app_id=" +
        EDAMAM_CREDENTIALS[index].APP_ID +
        "&app_key=" +
        EDAMAM_CREDENTIALS[index].API_KEY +
        // //health
        (hTagName.length > 0
          ? "&health=" + concatFilter(hTagName, "&health=")
          : "") +
        //cuisine
        (cTagName.length > 0
          ? "&cuisineType=" + concatFilter(cTagName, "&cuisineType=")
          : "") +
        // (getCTagName() ? "&cuisineType=" + FilterCleaner(getCTagName(), "&cuisineType=") : '') +
        // //meal
        (mTagName.length > 0
          ? "&mealType=" + concatFilter(mTagName, "&mealType=")
          : "") +
        // (getMTagName() ? "&mealType=" + FilterCleaner(getMTagName(), "&mealType=") : '') +
        // //dish
        (dTagName.length > 0
          ? "&dishType=" + concatFilter(dTagName, "&dishType=")
          : "") +
        // (getDTagName() ? "&dishType=" + FilterCleaner(getDTagName(), "&dishType=") : '') +
        //exclude
        (userExclude
          ? "&excluded=" + FilterCleaner(userExclude, "&excluded=")
          : "")
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
      if (numTry > MAX_NUM_TRY) {
        setSearchResult([]);
        console.log('out of num tries')
        return;
      }
      return searchRecipe((index + 1) % EDAMAM_CREDENTIALS.length, numTry + 1);
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
      if (recipe) {
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
      }
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
      <Stack spacing={2}>
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <button
            className="searchIcon"
            onClick={() => {
              searchRecipe(0, 0);
            }}
          >
            <SearchIcon />
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder={"Ingredients to exclude? (Seperate using commas!)"}
            value={userExclude}
            onChange={noHandleFilter}
          />
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <AllergenSelect setHTagName={setHTagName} />
            <CuisineType setCTagName={setCTagName} />
          </Stack>
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <MealType setMTagName={setMTagName} />
            <DishType setDTagName={setDTagName} />
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export default SearchBar;
