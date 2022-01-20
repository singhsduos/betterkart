import React from "react";
import { Button, Typography, Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from '@mui/icons-material/GitHub';
import "./SCSS/About.css";

const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/singhsduos";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/betterkart/image/upload/v1641815513/avatars/xyiolzj0v7tondedzlv5.png"
                            alt="Founder"
                        />
                        <Typography>Neelesh Singh</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by BetterKart in MERN Stack.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://twitter.com/singhs_duos"
                            target="blank"
                        >
                            <TwitterIcon className="twitterSvgIcon" />
                        </a>

                        <a href="https://github.com/singhsduos/" target="blank">
                            <GitHubIcon className="gitHubSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
