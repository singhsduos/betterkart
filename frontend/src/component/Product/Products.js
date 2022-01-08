import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader.js';
import './SCSS/Products/Product.css';

const Products = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { products, loading, error, productsCount } = useSelector((state) => state.products);

    // Get the userId param from the URL.
    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword));

    }, [dispatch, error, alert, keyword]);

    return (
        <>
            {loading ? (<Loader />) : (<>
                <h2 className="productsHeading">Products</h2>
                <div className="container">
                    {products && products.map((product) => {
                    return <ProductCard key={product._id} product={product}/>
                })}
                </div>

                <div className="paginationBox">
                    <Pagination
                    
                    />
                </div>
                
            </>)}
        </>
    )
}

export default Products;
