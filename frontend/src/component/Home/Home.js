import React from 'react';
import Button from '@mui/material/Button';
import MouseIcon from '@mui/icons-material/Mouse';
import "./SCSS/Home.css";



function Home() {
    return (
        <>
            <div className="banner">
                <p>Welcome to BetterKart</p>
                <h1> FIND AMAZINGS PRODUCTS BELOW</h1>

                <a href="#container">
                    <Button className='btn_Scroll'>
                        <span>Scroll</span>
                        <MouseIcon />
                    </Button>
                </a>
            
            </div>
        </>
    );
}




export default Home;
