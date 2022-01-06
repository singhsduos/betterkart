import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import React, { useEffect } from "react";
import Home from "./component/Home/Home.js";

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
      <Routes>
      <Route exact path="/" element={<Home/>} />
      </Routes>
      <Footer />
    </Router>
   
  );
}

export default App;
