import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import MouseIcon from '@mui/icons-material/Mouse';
import "./SCSS/Home.css";
import Product from './Product.js';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';

const Home = () => {

    const dispatch = useDispatch();
    const { loading, errors, products, productsCount } = useSelector((state) => state.products)

    // calling product Redux
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <>
            {loading ? <Loader/> :
                <>
                    <MetaData title="BetterKart" />
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
                        {products && products.map((product) =>
                            <Product key={product._id} product={product} />)}
                    </div>
                </>}
        </>
    );
}




export default Home;
