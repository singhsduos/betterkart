import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import MouseIcon from '@mui/icons-material/Mouse';
import "./SCSS/Home.css";
import Product from './ProductCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.products)

    // calling product Redux
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

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
