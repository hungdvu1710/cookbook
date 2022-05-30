import "./LandingPage.css";
import image from "../LandingPage/bg_logo.png";
import SearchBar from "./SearchBar/SearchBar";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard";
import { Button } from "@mui/material";
import cblogo from '../LandingPage/cb1.gif';
import RecipeModal from "../RecipeModal";
import { ReactDimmer } from "react-dimmer";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const BE_HOST = process.env.REACT_APP_BACKEND_DOMAIN;

const LandingPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [nextLink, setNextLink] = useState(null);
  const { isSignedIn, user } = useUser();
  const [isModalOpen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [isAlertBoxOpen, setAlertBox] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      //send userData to BE
      const { primaryEmailAddress, id } = user;
      const userData = {
        email: primaryEmailAddress.emailAddress,
        id: id,
      };
      fetch(BE_HOST + "api/user", {
        body: JSON.stringify(userData),
        cache: "no-cache",
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [isSignedIn, user])

  const getNextRecipes = async () => {
    let data = await fetch(nextLink)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
    if (!data) {
      setAlertBox(true);
      return;
    }

    const { hits, _links } = data;
    let result = searchResult;
    if (Object.keys(_links).length !== 0) {
      const { next } = _links;
      setNextLink(next.href);
    } else {
      setNextLink(null);
    }
    hits.forEach((hit) => {
      const { recipe } = hit;
      const {
        image,
        label,
        totalTime,
        url,
        mealType,
        uri,
        cautions,
        cuisineType,
        dietLabels,
        ingredientLines,
        calories,
      } = recipe;
      const id = uri.slice(uri.indexOf("recipe_"));
      result.push({
        image,
        label,
        totalTime,
        url,
        mealType,
        id,
        cautions,
        cuisineType,
        dietLabels,
        ingredientLines,
        calories,
      });
    });
    setSearchResult(result);
    if (isSignedIn) {
      //send userData to BE
      const { id } = user;
      await fetch(BE_HOST + "api/recipes?id=" + id, {})
        .then((response) => response.json())
        .then((data) => {
          setSavedRecipe(data);
        });
    }

    return;
  };

  const openModal = (recipe) => {
    setModal(true);
    setModalData(recipe);
  };

  return (
    <div>
      <Dialog
        open={isAlertBoxOpen}
        onClose={() => {
          setAlertBox(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>
              You've reached the limits for total number of requests per minutes
            </strong>{" "}
            - Please wait and try again
          </Alert>
        </DialogContent>
      </Dialog>
      
      <div className="landing-page__logo-holder">
        <img src={cblogo} id="logo" alt="logo"/>
      </div>

      <SearchBar
        placeholder="Start browsing for recipes!"
        setSavedRecipe={setSavedRecipe}
        setSearchResult={setSearchResult}
        setNextLink={setNextLink}
      />
      {searchResult.map((result) => {
        const isSavedDisabled = savedRecipe.includes(result.id);
        return (
          <RecipeCard
            recipe={result}
            key={result.id}
            openModal={openModal}
            isSavedDisabled={isSavedDisabled}
          />
        );
      })}
      {isModalOpen && (
        <RecipeModal
          recipe={modalData}
          closeModal={() => {
            setModal(false);
          }}
        />
      )}
      {nextLink ? (
        <Button
          className="landing-page__pagination-btn"
          variant="contained"
          onClick={getNextRecipes}
        >
          {" "}
          NEXT{" "}
        </Button>
      ) : (
        ""
      )}

      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={100}
        blur={1.5}
      />
    </div>
  );
};

export default LandingPage;
