import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
const Cart = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <ShoppingBasketOutlinedIcon />

          <Typography>Your Shopping Cart is Empty</Typography>
          <Link to="/products">Continue Shopping</Link>
        </div>
      ) : (
        <Fragment>
          <h2 style={{width:"90%", margin:"30px auto"}}>Your Cart <span style={{color:"tomato", fontSize:"1.1rem"}}>({`${cartItems.length} items`})</span></h2>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Sub-Total</p>
              <p>Remove</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item}/>
                    <div className="quantity-2">
                      <p className="quantity-desc-2">
                        <span className="minus-2"  onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }>
                            <RemoveIcon/>
                        </span>
                        <span className="num-2">{item.quantity}</span>
                        <span className="plus-2"  onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }>
                          <AddIcon/>
                        </span>
                      </p>
                    </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                  <p className="removeItem" onClick={() => deleteCartItems(item.product)}><ClearOutlinedIcon style={{cursor:"pointer", color:"rgb(61, 61, 61"}}/></p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Total Cost</p>
                <p className="totalCost">{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;