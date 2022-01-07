import React from 'react';
import { Link } from "react-router-dom";
import ReactStar from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    // CSS and Values for Stars
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 18 : 20,
        value: product.ratings,
        isHalf: true,
    }
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStar {...options} classNames="stars"/>
                <span>({product.numberOfReviews} Reviews)</span>
            </div>
            <span>{ `₹${product.price}` }</span>
        
        </Link>
    )
}

export default ProductCard;
