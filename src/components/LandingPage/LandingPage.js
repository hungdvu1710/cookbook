import "./LandingPage.css";
import React from 'react';
import './App.css';
import {ButtonComponent} from '@syncfusion/ej2-react-buttons';

const LandingPage = () => {
function App() {
  const SaySomething = (args) => {
    print("Saying Something!")
  }
  return (
    <div className>
      {/** 
      Signup and Login Buttons
      Create your own components for Sign up and Login buttons Then add them
      to this section You can add to the LandingPage.css file for styling 
      */
      <ButtonComponent cssClass="e-info"
                       onClick={SaySomething}>
        content = "Log In"
      </ButtonComponent>
      
      

      
      }
      {
        //Logo
      }

      {
        //Recipe Search Bar
      }
    </div>
  );
}
};

export default LandingPage;
