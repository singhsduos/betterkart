import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            // we will check that we are adding item in our cart is still exist on cart or not
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i)=>i.product !== action.payload),
            }

        default:
           return state;
    }
}