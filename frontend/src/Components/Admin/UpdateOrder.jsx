import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import CategoryIcon from '@mui/icons-material/Category';
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./updateOrder.css";
import {toast} from "react-hot-toast";
import Loader from "../Loader/Loader";

const ProcessOrder = () => {

    const {id} = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

//   const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        
          {loading ? (
            <Loader />
          ) : (
        <div className="updateOrderContainer" style={{
            display: order.orderStatus === "Delivered" ? "block" : "grid",
          }}>
            <div className="confirmCartItems2" >
                <h2 style={{fontSize:"1.2rem", color:"rgb(21, 21, 21)",padding:"1vmax 0vmax", borderTop:"1px solid rgba(0, 0, 0, 0.205)", borderBottom:"1px solid rgba(0, 0, 0, 0.205)"}}>Order Items</h2>
                <div className="confirmCartItemsContainer2">
                {order.orderItems &&
                      order.orderItems.map((item) => (
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
                    <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{order.totalPrice && order.totalPrice}</span>
                    </div>
                <h2 style={{fontSize:"1.2rem", color:"rgb(21, 21, 21)",padding:"1vmax 0vmax", borderTop:"1px solid rgba(0, 0, 0, 0.205)", borderBottom:"1px solid rgba(0, 0, 0, 0.205)"}}>Shipping Info</h2>
                <div className="orderSummaryContainer">
                    <div className="orderSummary">
                        <div >
                            <p>Name:</p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                        </div>    
                    </div>
                </div>
                </div>
            </div>
            <div className="updateOrderBox"  style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <CategoryIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
            </div>
        </div>
          )}
        
      </div>
    </Fragment>
  );
};

export default ProcessOrder;