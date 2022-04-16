import React from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Navbar = (props) => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <ButtonGroup color="success" variant="contained" aria-label="outlined primary button group">
            <Button onClick={props.signIn}>Sign In</Button>
            <Button onClick={props.signUp}>Sign Up</Button>
          </ButtonGroup>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
