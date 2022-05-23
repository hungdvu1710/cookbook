import "./KitchenPage.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const data = {
    name: [
      { recipe: 1, ingredients: "abcde" },
      { recipe: 2, ingredients: "fghs" },
      { recipe: 3, ingredients: "reaf" },
      { recipe: 4, ingredients: "fafdsfghs" },
      { recipe: 5, ingredients: "fadf" },
      { recipe: 6, ingredients: "rgrhjgk" },
      { recipe: 7, ingredients: "sdoihsaifhe" },

 
    ],
    id: [1],
  };
  return (
    <div className={classes.root}>
      {data.id.map((elem) => (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {data.name.map((elem) => (
            <Grid item xs={3} key={data.name.indexOf(elem)}>
              <Card>
                <CardHeader
                  title={`recipe : ${elem.recipe}`}
                  subheader={`ingredients : ${elem.ingredients}`}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    insert stuff from api later
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
}
