import React from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          
          <img src={require('../../../images/logo.jpg')} alt="logo" />
          
        </NavLink>

        <Bars />

        <NavMenu>

          <NavLink to="/signin" activeStyle={{ color: "black" }}>
            Sign In
          </NavLink>

          <NavBtn>
            <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
          </NavBtn>

        </NavMenu>

      </Nav>
    </>
  );
};

export default Navbar;
