import React from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

import { SignInButton, SignUpButton } from "@clerk/clerk-react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Navbar = (props) => {
  return (
    <>
      <Nav>
        <NavMenu>
          <ButtonGroup
            color="success"
            variant="contained"
            aria-label="outlined primary button group"
          >
            <SignInButton mode="modal">
              <Button style={{ backgroundColor: "#edc86b" }}>Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button style={{ backgroundColor: "#edc86b" }}>Sign Up</Button>
            </SignUpButton>
          </ButtonGroup>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
