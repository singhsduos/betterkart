import React from 'react';
import { Link } from "react-router-dom";
import ReactStar from "react-rating-stars-component";

// CSS and Values for Stars
const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 20,
    value: 2.5,
    isHalf: true,
}

function Product({product}) {
    return (
        <Link className='productCard' to={product._id}>
            <img src={product.images[0].url} alt='{product.name}' />
            <p>{product.name}</p>
            <div>
                <ReactStar {...options} />
                <span>( 256 review )</span>
            </div>
            <span>{ product.price }</span>
        
        </Link>
    )
}

export default Product
