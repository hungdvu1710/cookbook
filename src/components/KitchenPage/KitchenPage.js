import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KitchenPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
useEffect(() => {
    fetchSavedRecipes();
}, []);
const fetchSavedRecipes = () => {
  axios
    .get('https://shoppingapiacme.herokuapp.com/shopping')
    .then((res) => {
      console.log(res);
      setSavedRecipes(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
return (
    <div>
      <div className='item-container'>
        {savedRecipes.map((savedRecipes) => (
          <div className='card' key={savedRecipes.id}>
            <img src={savedRecipes.image} alt='' className='kitchen-page__img'/>
            <h3>{savedRecipes.brand}</h3>
            <p>{savedRecipes.item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default KitchenPage;