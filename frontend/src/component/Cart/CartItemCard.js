import React from 'react';
import {Link} from "react-router-dom";
import "./SCSS/CartItemCard/CartItemCard.css";

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt="product" />
            <div>
                <Link replace to={`/product/${item.product}`}>{item.name} </Link>
                <span>{`Price: ₹${item.price}`}</span>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div> 
        </div>
    )
}

export default CartItemCard

