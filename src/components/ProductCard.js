import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export const ProductCard = ({product}) => {
  const [isInCart, setIsInCart] = useState(false);
  const {id, name, price, image} = product;
  const {cartList, addCart, removeCart} = useCart();

  useEffect(() => {
    const inCart = cartList.find(element => element.id === id);

    if (inCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }

  }, [cartList, id]);

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {isInCart ? <button className="remove" onClick={()=>removeCart(product)}>Remove</button> : 
        <button onClick={()=>addCart(product)}>Add To Cart</button> }

      </div>
    </div>
  )
}
