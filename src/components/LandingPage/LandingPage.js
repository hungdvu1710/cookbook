import "./LandingPage.css";
import RecipeData from "../Data.json"; 
import SearchBar from "./SearchBar/SearchBar";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
      {
        //Recipe Search Bar
        <Button variant="Pizza Time"
          onClick={() => {
            SendApiRequest();
        }}>Pizza Time </Button>

        
      }
    </div>
  );
};

async function SendApiRequest(){
  let APP_ID = "98817906"
  let API_KEY = "5bdef1c2cd6643063f7313d060069af6"
  let response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=' + APP_ID + '&app_key=' + API_KEY);
  console.log(response)
  let data = await response.json()
  console.log(data)
  //useApiData(data)
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
