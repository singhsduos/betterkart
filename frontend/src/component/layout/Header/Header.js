import React, { useState } from "react";
import logo from "../../../images/logo.png";
import "./SCSS/Header.css";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch, BsFillCartCheckFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);

    return (
        <>

            <div className="menuBurger">

                <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                    <GiHamburgerMenu />
                </a>

            </div>

            <nav className={
                showMediaIcons ? "main-nav open" : "main-nav close"
            }>

                {/* 1st logo part  */}
                <div className="logo">
                    <NavLink onClick={() => setShowMediaIcons(!showMediaIcons)} to="/">
                        <img src={logo} alt="BetterKart" />
                    </NavLink>
                </div>

                {/* 2nd menu part  */}
                <div className="menu-link"
                >
                    <ul>
                        <div>
                            <li>
                                <NavLink to="/" onClick={() => setShowMediaIcons(!showMediaIcons)}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" onClick={() => setShowMediaIcons(!showMediaIcons)}>Products</NavLink>
                            </li>
                        </div>
                        <div>
                            <li>
                                <NavLink to="/contact" onClick={() => setShowMediaIcons(!showMediaIcons)}>Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" onClick={() => setShowMediaIcons(!showMediaIcons)}>About</NavLink>
                            </li>
                        </div>
                    </ul>
                </div>

                {/* 3rd social media links */}
                <div className="social-media">
                    <ul className="social-media-desktop">
                        <li>
                            <NavLink onClick={() => setShowMediaIcons(!showMediaIcons)} to="/search">
                                <BsSearch className="facebook" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setShowMediaIcons(!showMediaIcons)} to="/cart">
                                <BsFillCartCheckFill className="facebook" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setShowMediaIcons(!showMediaIcons)} to="/login">
                                <FaUserCircle className="facebook" />
                            </NavLink>
                        </li>
                    </ul>


                </div>
            </nav>
        </>
    );
};



export default Header;