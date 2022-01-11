import React from 'react';
import CartItemCard from "./CartItemCard.js";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction.js';
import { Link } from "react-router-dom";
import "./SCSS/Cart.css";

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const netQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, netQty));
    };


    const decreaseQuantity = (id, quantity) => {
        const netQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, netQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };


    return (
        <>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <>
                    <MetaData title={`Cart-Section -- BetterKart`} />
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>SubTotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput">
                                        <Button onClick={() => decreaseQuantity(item.product, item.quantity)} className='button'><RemoveIcon /></Button>
                                        <input type="number" readOnly value={item.quantity} />
                                        <Button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className='button'><AddIcon /></Button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                            ))}

                        <div className="cartGrossTotal">
                            <div></div>
                            <div className="cartGrossTotalBox">
                                <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price,
                                        0
                                    )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutButton">
                                <Button className='button'>Check Out</Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart
