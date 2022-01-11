import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import ReactStar from "react-rating-stars-component";
import './SCSS/ProductDetails/ProductDetails.css';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import MetaData from "../layout/MetaData";
import {addItemsToCart} from  "../../actions/cartAction"; 

const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails);

    // Get the userId param from the URL.
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    // CSS and Values for Stars
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 18 : 20,
        value: product.ratings,
        isHalf: true,
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        // if stock is 5 then you can add value till 5 otherwise return it
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };


    return (
        <>
            {loading ? <Loader /> : (<>
                <MetaData title={`${product.name} -- BetterKart`} />
                <div className='ProductDetails'>
                    <div>
                        <Carousel>
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img className='CarouselImage' src={item.url} key={i} alt={`${i} Slide`} />
                                ))
                            }
                        </Carousel>
                    </div>

                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>

                        </div>

                        <div className="detailsBlock-2">
                            <ReactStar {...options} />
                            <span>({product.numberOfReviews} Reviews)</span>
                        </div>

                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button onClick={addToCartHandler}>Add to Cart</button>
                            </div>


                            <p>
                                Status:
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>


                        <div className="detailsBlock-4">
                            Description: <p>{product.description}</p>
                        </div>

                        <button className="submitReview">Submit Review</button>


                    </div>
                </div>

                <h3 className='reviewsHeading'>Reviews</h3>
                {
                    product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review,i) => <ReviewCard review={review} key={i} />)}
                        </div>
                    ) : (<p className="noReviews">No Reviews Yet</p>)
                }
            </>)}
        </>
    )
}

export default ProductDetails;
