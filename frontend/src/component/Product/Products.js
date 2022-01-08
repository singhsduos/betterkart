import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Pagination from "react-js-pagination";
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader.js';
import './SCSS/Products/Product.css';

const Products = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0, 25000]);


    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    // Get the userId param from the URL.
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price));

    }, [dispatch, error, alert, keyword, currentPage, price]);

    let count = filteredProductsCount;

    return (
        <>
            {loading ? (<Loader />) : (<>
                <h2 className="productsHeading">Products</h2>
                <div className="container">
                    {products && products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </div>


                {/* FilterOptionsSlider*/}
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                </div>

                {/* Pagination*/}
                {resultPerPage < productsCount && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="First"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}

            </>)}
        </>
    )
}

export default Products;
