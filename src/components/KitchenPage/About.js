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
            There are certain things the modern home cook values when looking
            for recipes: expedience and convenience. With a physical cookbook,
            this is just a matter of finding your recipe in the table of
            contents or an old bookmark, and flipping right to it. With online
            recipes, however, expedience is often hampered by a wall of
            backstory unwanted by the user.{" "}
          </h2>

          <h2>
            {" "}
            If they are unsatisfied with the first recipe they come across then
            they have to go back and scroll through even more blurbs, which
            makes the entire experience of looking for recipes inconvenient.
            Cookbook’s purpose is to be a tool for the modern home cook,
            bringing that desired expedience and convenience back into the
            kitchen. The app finds the recipe for you, skipping you straight to
            checking out the recipe itself. It can help you in your searches,
            focusing on recipes with ingredients and cookware you’ve specified
            for your “Kitchen”. When you find a recipe you like, you can save it
            to your account’s “Kitchen” for later.
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
