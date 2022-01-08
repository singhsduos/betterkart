import React, { useEffect, useState } from 'react';
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

    const [currentPage, setCurrentPage] = useState(1);

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);

    // Get the userId param from the URL.
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage));

    }, [dispatch, error, alert, keyword, currentPage]);

    return (
        <>
            {loading ? (<Loader />) : (<>
                <h2 className="productsHeading">Products</h2>
                <div className="container">
                    {products && products.map((product) => {
                    return <ProductCard key={product._id} product={product}/>
                })}
                </div>

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
