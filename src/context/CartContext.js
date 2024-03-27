// const { createContext } = require("react");
import { useContext, useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(initialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);


    const addCart = (product) => {

        const updatedCartList = state.cartList.concat(product);
        updateTotal(updatedCartList);

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedCartList
            }
        })

    }

    const removeCart = (product) => {

        const updatedCartList = state.cartList.filter(current => current.id !== product.id);
        updateTotal(updatedCartList);

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedCartList
            }
        })

    }

    const updateTotal = (cartLists) => {

        let new_total = 0;

        cartLists.forEach(element => {new_total = new_total + element.price});
        dispatch({
            type: "UPDATE_TOTAL",
            payload: {
                total: new_total
            }
        })

    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        addCart,
        removeCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );

}

export const useCart = () => useContext(CartContext);