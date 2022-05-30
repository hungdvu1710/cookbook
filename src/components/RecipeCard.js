import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AccessTime } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import "./RecipeCard.css";
import { useState } from "react";
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

const RecipeCard = (props) => {
  const [isSavedDisabled, setIsSavedDisabled] = useState(props.isSavedDisabled);
  const showRecipeDetails = () => {
    props.openModal(props.recipe);
  };
  const { isSignedIn, user } = useUser();
  let id;

  if (isSignedIn) {
    id = user.id;
  }

  const saveRecipe = () => {
    setIsSavedDisabled(true);
    const recipeData = {
      recipe: props.recipe.id,
      id: id,
    };
    fetch(BE_HOST + "/api/recipes", {
      body: JSON.stringify(recipeData),
      cache: "no-cache",
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Grid item xs={3} sx={{ borderRadius: 40 }} className="recipe-card">
      <Paper elevation={3}>
        <img src={props.recipe.image} alt="..." className="img" />
        <Box paddingX={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" component="h2" marginLeft={0.3}>
              {props.recipe.label}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTime sx={{ width: 12.5 }} />
            <Typography variant="body2" component="p" marginLeft={0.3}>
              {props.recipe.totalTime} Minutes
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="p" marginLeft={0.3}>
              Meal Type: {props.recipe.mealType[0]}
            </Typography>
          </Box>
          {/* <Link underline="hover" variant="body2" href={props.recipe.url}>
            GO TO RECIPE!!!
          </Link> */}
          <div className="recipe-card__btn-holder">
            <Button
              variant="outlined"
              onClick={showRecipeDetails}
              className="recipe-card__btn"
              sx={{ borderColor: '#1b5e20' }}
              endIcon={<MenuBookTwoToneIcon />}
            >
              Show More{" "}
            </Button>
          </div>
          <div className="recipe-card__btn-holder">
            {isSignedIn &&
              (isSavedDisabled ? (
                <Button
                  variant="outlined"
                  disabled
                  endIcon={<BookmarkAddedTwoToneIcon />}
                >
                  Saved{" "}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={saveRecipe}
                  className="recipe-card__btn"
                  sx={{ borderColor: '#1b5e20' }}
                  endIcon={<BookmarkAddTwoToneIcon />}
                >
                  Save{" "}
                </Button>
              ))}
          </div>
        </Box>
      </Paper>
    </Grid>
  );
};

export default RecipeCard;
