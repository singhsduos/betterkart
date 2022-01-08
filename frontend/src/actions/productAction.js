import axios from "axios";

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    // ADMIN_PRODUCT_REQUEST,
    // ADMIN_PRODUCT_SUCCESS,
    // ADMIN_PRODUCT_FAIL,
    // NEW_PRODUCT_REQUEST,
    // NEW_PRODUCT_SUCCESS,
    // NEW_PRODUCT_FAIL,
    // NEW_PRODUCT_RESET,
    // UPDATE_PRODUCT_REQUEST,
    // UPDATE_PRODUCT_SUCCESS,
    // UPDATE_PRODUCT_FAIL,
    // UPDATE_PRODUCT_RESET,
    // DELETE_PRODUCT_REQUEST,
    // DELETE_PRODUCT_SUCCESS,
    // DELETE_PRODUCT_FAIL,
    // DELETE_PRODUCT_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    // NEW_REVIEW_REQUEST,
    // NEW_REVIEW_SUCCESS,
    // NEW_REVIEW_FAIL,
    // NEW_REVIEW_RESET,
    // ALL_REVIEW_REQUEST,
    // ALL_REVIEW_SUCCESS,
    // ALL_REVIEW_FAIL,
    // DELETE_REVIEW_REQUEST,
    // DELETE_REVIEW_SUCCESS,
    // DELETE_REVIEW_FAIL,
    // DELETE_REVIEW_RESET,
    CLEAR_ERRORS,

} from "../constants/productConstants";


export const getProduct = (keyword = "", currentPage = 1, price=[0,25000]) => async (dispatch) => {
    try { 
 
        dispatch({
            type:ALL_PRODUCT_REQUEST,
        });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    }
    catch (err) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: err.response.data.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });

        let link = `/api/v1/product/${id}`;

        const { data } = await axios.get(link);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.message,
        })
    }
}

// Clearing the errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
 }