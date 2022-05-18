import "./RecipeModal.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccessTime } from "@mui/icons-material";
import Link from "@mui/material/Link";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

const RecipeModal = (props) => {
  console.log(props.recipe);
  return (
    <div className="recipe-modal">
      <Card sx={{ overflowY: "scroll" }}>
        {/* <div className='recipe-modal__img-holder'> */}
        <img
          src={props.recipe.image}
          alt={props.recipe.label}
          className="recipe-modal__img"
        />
        {/* </div> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.recipe.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cuisine: {props.recipe.cuisineType[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Calories: {props.recipe.calories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Meal Type: {props.recipe.mealType[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Diet Label: {props.recipe.dietLabels[0]}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTime sx={{ width: 12.5 }} />
            <Typography variant="body2" color="text.secondary">
              Total time: {props.recipe.totalTime} Minutes
            </Typography>
          </Box>
          <Typography variant="h6" component="div">
            Ingredients:
          </Typography>
          {props.recipe.ingredientLines.map((ingredient) => {
            return (
              <Typography
                variant="body2"
                color="text.secondary"
                key={ingredient}
              >
                {ingredient}
              </Typography>
            );
          })}
        </CardContent>
        <CardActions>
          <Link
            underline="hover"
            sx={{ margin: 1 }}
            variant="body2"
            href={props.recipe.url}
          >
            GO TO RECIPE!!!
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};
export default RecipeModal;
