import React from "react";
import PlayStore from "../../../images/playstore.png";
import AppStore from "../../../images/Appstore.png";
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import "./SCSS/Fotter.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={PlayStore} alt="playstore" />
                <img src={AppStore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>BetterKart</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights {new Date().getFullYear()} &copy; BetterKart</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>

                <Button href="https://www.linkedin.com/in/neeleshsng/" target="_blank" className="btn_linkedin">
                    <LinkedInIcon />
                </Button>

                <Button href="https://github.com/singhsduos/" target="_blank" className="btn_gitHub">
                    <GitHubIcon/>
                </Button>

                <Button href="https://twitter.com/singhs_duos" target="_blank" className="btn_twitter">
                    <TwitterIcon/>
                </Button>
                 
            </div>
        </footer>
    );
};

export default Footer;