import React from "react";
import pic from "../KitchenPage/logo1.png";

export const About = () => {
  return (
    <div>
      <div id="hi">
        <h1> Hi! We are,</h1>

        <img src={pic} alt="pic" id="pic" />

        <p>
          <h2>
            {" "}

            No more walls of texts. Straight to the recipe.

  
            {" "}
          </h2>

          <h2>
            {" "}
            Found a recipe you like and want to save it for later? Sign-up and get your very own Kitchen to save all your favorite recipes!
          </h2>

          <h2>
            We hope you love this app as much as we loved making it! Happy
            cooking!!
          </h2>

          <h2>
            <p> Best,</p>
            Aakriti, Dakota, Hung :)
          </h2>
        </p>
      </div>

      <div></div>
    </div>
  );
};
