// import './App.css';
import Header from "./component/layout/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import webfont from "webfontloader";
import React, {useEffect} from "react";

function App() {
//  calling useEffect for font so that it load font first
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  });


  return (
    <Router>
      <Header />
    </Router>
   
  );
}

export default App;
