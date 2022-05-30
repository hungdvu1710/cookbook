import React, { useState, useEffect } from "react";
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
const MAX_NUM_TRY = 7;

const KitchenPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [numTry, setNumTry] = useState(0);
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    getUserSavedRecipe();
  }, [user]);

  const getUserSavedRecipe = async () => {
    if (isSignedIn) {
      //send userData to BE
      const { id } = user;
      await fetch(BE_HOST + "api/recipes?id=" + id, {})
        .then((response) => response.json())
        .then(async (data) => {
          const recipes = await Promise.all(
            data.map(async (recipe) => {
              return await searchRecipeById(recipe, 0);
            })
          );
          console.log(recipes);
          setSavedRecipes(recipes);
        });
    }
  };

  const searchRecipeById = async (id, index) => {
    let data = await fetch(
      "https://api.edamam.com/api/recipes/v2/" +
        id +
        "?type=public&app_id=" +
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
      setNumTry((prevState) => prevState++);
      if (numTry > MAX_NUM_TRY) {
        return null;
      }
      return searchRecipeById(id, (index + 1) % EDAMAM_CREDENTIALS.length);
    }
    const { recipe } = data;
    const { image, label, totalTime, mealType, ingredientLines } = recipe;
    return {
      image,
      label,
      totalTime,
      mealType,
      ingredientLines,
      id,
    };
  };

  return (
    <div>
      <div className="kitchen-page__item-container">
        {savedRecipes.map((recipe) => {
          if (!recipe) return "";
          return (
            <div className="kitchen-page__card" key={recipe.id}>
              <img src={recipe.image} alt="" className="kitchen-page__img" />
              <h3>{recipe.label}</h3>
              <p>Time: {recipe.totalTime} minutes</p>
              <p>Meal Type: {recipe.mealType[0]}</p>
              <div className="kitchen-page__ingredients">
                <h4>Ingredients:</h4>
                {recipe.ingredientLines.map(ingredient => {
                  return (<p>{ingredient}</p>)
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default KitchenPage;
