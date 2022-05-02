import "./LandingPage.css";
import RecipeData from "../Data.json";
import SearchBar from "./SearchBar/SearchBar";

import * as React from 'react';
//import RecipeCard from "./components/RecipeCard";

//import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
let searchButton = document.querySelector("#search")



const LandingPage = () => {
  return (
    <div>
      {/** 
      Signup and Login Buttons
      Create your own components for Sign up and Login buttons Then add them
      to this section You can add to the LandingPage.css file for styling 
      
      
      */}

      {
        //Logo
      }
      <SearchBar placeholder="Start browsing for recipes!" data={RecipeData} />

      <input type="text" placeholder="Recipe Search" id="userInput" />
      <button type="button" onClick={getInputValue}>Pizza Time</button>
    </div>
  );
};

function getInputValue() {
  // Selecting the input element and get its value 
  var inputVal = document.getElementById("userInput").value;

  //use the user's input to search for recipes
  SendApiRequest(inputVal);
}


async function SendApiRequest(inputVal) {
  let APP_ID = "98817906"
  let API_KEY = "5bdef1c2cd6643063f7313d060069af6"
  let response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + inputVal + '&app_id=' + APP_ID + '&app_key=' + API_KEY + '&random=true');
  let data = await response.json()
  console.log(data)
  //RecipeCard(data)
  return;
}

//function that does something with the data recieved from the API.
/*function useApiData(data){
  document.querySelector("#content").innerHTML = `
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    `
  );
}*/



export default LandingPage;
