import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router } from "react-router-dom";
import webfont from "webfontloader";
import React, {useEffect} from "react";

function App() {
//  calling useEffect for font so that it load font first
//  and we added emptyArray with useEffect becoz i want it render only 1st time
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  },[]);


  return (
    <Router>
      <Header />
      <Footer />
    </Router>
   
  );
}

export default App;
