import React from "react";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import "./PaymentSuccess.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleOutlineOutlinedIcon />

      <h1>Order Successful</h1>
      <p>Thank You some much for your order!</p>
      <div >
        <Link id="order_btn" to="/orders">View Orders</Link>
        <Link to="/products">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;