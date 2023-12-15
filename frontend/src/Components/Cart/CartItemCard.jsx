import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";


const CartItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
      </div>
    </div>
  );
};

export default CartItemCard;