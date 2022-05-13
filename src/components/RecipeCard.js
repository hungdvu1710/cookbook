import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AccessTime } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import "./RecipeCard.css";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

const RecipeCard = (props) => {
  const { isSignedIn, user } = useUser();
  let id;

  if (isSignedIn) {
    id = user.id;
  }

  const saveRecipe = () => {
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
    <Grid item xs={3} className="recipe-card">
      <Paper elevation={3}>
        <img src={props.recipe.image} alt="..." className="img" />
        <Box paddingX={1}>
          <Typography variant="subtitle1" component="h2">
            {props.recipe.label}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTime sx={{ width: 12.5 }} />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              {props.recipe.totalTime} Minutes
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="p" marginLeft={0.5}>
              Meal Type: {props.recipe.mealType[0]}
            </Typography>
          </Box>
          <Link underline="hover" variant="body2" href={props.recipe.url}>
            GO TO RECIPE!!!
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {isSignedIn && <Button onClick={saveRecipe}>Save Recipe</Button>}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default RecipeCard;
