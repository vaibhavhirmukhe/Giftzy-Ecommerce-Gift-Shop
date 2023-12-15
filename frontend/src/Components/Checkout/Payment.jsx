import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import {toast} from "react-hot-toast";
import axios from "axios";
import { clearErrors, createOrder } from "../../actions/orderAction";

const ConfirmOrder = () => {

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = Math.round(subtotal * 0.12);

  const totalPrice = subtotal + tax + shippingCharges;

//   const submitHandler = () => {
//     const data = {
//       subtotal,
//       shippingCharges,
//       tax,
//       totalPrice,
//     };

//     sessionStorage.setItem("orderInfo", JSON.stringify(data));

//     // history.push("/process/payment");
//   };

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice:shippingCharges,
    totalPrice: totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: "IN",
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          toast.success("Payment Successfull");
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);


  return (
    <Fragment>
        <div className="paymentPage">
            <div className="confirmCartItems2">
                <h2 style={{fontSize:"1.2rem", color:"rgb(21, 21, 21)",padding:"1vmax 0vmax", borderTop:"1px solid rgba(0, 0, 0, 0.205)", borderBottom:"1px solid rgba(0, 0, 0, 0.205)"}}>Confirm Order</h2>
                <div className="confirmCartItemsContainer2">
                {cartItems &&
                    cartItems.map((item) => (
                    <div key={item.product}>
                        <div className="img-container">
                            <img src={item.image} alt="Product" />
                            <span className="item-qty">{item.quantity}</span>
                        </div>
                        <Link to={`/product/${item.product}`}>
                        {item.name}
                        </Link>{" "}
                        <span>
                            <b>₹{item.price * item.quantity}</b>
                        </span>
                    </div>
                ))}
                <h2 style={{fontSize:"1.2rem", color:"rgb(21, 21, 21)",padding:"1vmax 0vmax", borderTop:"1px solid rgba(0, 0, 0, 0.205)", borderBottom:"1px solid rgba(0, 0, 0, 0.205)"}}>Order Summary</h2>
                <div className="orderSummaryContainer">
                    <div className="orderSummary">
                        <div >
                            <p>Subtotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Delivery Charges:</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                <h2 style={{fontSize:"1.2rem", color:"rgb(21, 21, 21)",padding:"1vmax 0vmax", borderBottom:"1px solid rgba(0, 0, 0, 0.205)"}}>Payment Info</h2>
                <div>
                    <CreditCardOutlinedIcon />
                    <CardNumberElement className="paymentInput" />
                </div>
                <div>
                    <EventOutlinedIcon />
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                    <VpnKeyOutlinedIcon />
                    <CardCvcElement className="paymentInput" />
                </div>

                <input
                    type="submit"
                    value={`Pay - ₹${totalPrice}`}
                    ref={payBtn}
                    className="paymentFormBtn"
                />
                </form>
            </div>
        </div>
    </Fragment>
  );
};

export default ConfirmOrder;