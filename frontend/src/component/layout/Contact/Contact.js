import React from "react";
import "./SCSS/Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:ns9628491678@gmail.com">
                <Button>Contact: ns9628491678@gmail.com</Button>
            </a>
        </div>
    );
};

export default Contact;
