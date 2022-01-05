import React from 'react';
import Button from '@mui/material/Button';
import MouseIcon from '@mui/icons-material/Mouse';



function Home() {
    return (
        <>
            <div className="banner">
                <p>Welcome to BetterKart</p>
                <h1>Find Amazings Product Below</h1>

                <a href="#container">
                    <Button>
                        Scroll
                        <MouseIcon />
                    </Button>
                </a>
            
            </div>
        </>
    );
}




export default Home;
