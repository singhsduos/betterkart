import React from 'react';
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
    // CSS and Values for Stars
    const options = {
        size: "small",
        readOnly: true,
        precision: 0.5,
        value: product.ratings,
    }
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} className="stars" />
                <span className='span'>({product.numberOfReviews} Reviews)</span>
            </div>
            <span className='productPriceSpan'>{`₹${product.price}`}</span>

        </Link>
    )
}

export default ProductCard;
