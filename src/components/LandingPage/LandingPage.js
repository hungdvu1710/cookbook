import "./LandingPage.css";
import RecipeData from "../Data.json";
import SearchBar from "./SearchBar/SearchBar";
import { useUser } from "@clerk/clerk-react";
//import RecipeCard from "./components/RecipeCard";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

// fetch(BE_HOST + "/api/recipes", {
//   body: JSON.stringify(userData),
//   cache: "no-cache",
//   mode: "cors",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const LandingPage = () => {
  const { isSignedIn, user } = useUser();
  if (isSignedIn) {
    //send userData to BE
    const { primaryEmailAddress, id } = user;
    const userData = {
      email: primaryEmailAddress.emailAddress,
      id: id,
    };
    fetch(BE_HOST + "/api/user", {
      body: JSON.stringify(userData),
      cache: "no-cache",
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
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
  const { hits } = data
  hits.forEach(hit => {
    const { recipe } = hit
    const { image, label, totalTime, url, mealType} = recipe
    console.log(image, label, totalTime, url, mealType)
  })
  
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
