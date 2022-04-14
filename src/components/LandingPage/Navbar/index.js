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
