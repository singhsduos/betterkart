import React from 'react';
import Button from '@mui/material/Button';
import MouseIcon from '@mui/icons-material/Mouse';
import "./SCSS/Home.css";
import Product from './Product.js';

const product = {
    name: "T-Shirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "₹3000",
    _id: "Neel",
}

const Home = () => {
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

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

            </div>
        </>
    );
}




export default Home;
