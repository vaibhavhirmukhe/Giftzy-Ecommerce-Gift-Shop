import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ProductDetails from "./Components/Product/ProductDetails";
import Products from "./Components/Product/Products";
import Footer from "./Components/Footer/Footer";
import LoginSignUp from "./Components/User/LoginSignUp";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import Protected from "./Components/Route/Protected";
import Profile from "./Components/User/Profile";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Checkout/Shipping";
import Payment from "./Components/Checkout/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import PaymentSuccess from "./Components/Checkout/PaymentSuccess";
import MyOrders from "./Components/Order/MyOrders";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import { useDispatch } from "react-redux";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import OrderList from "./Components/Admin/OrderList";
import UpdateOrder from "./Components/Admin/UpdateOrder";
import UserList from "./Components/Admin/UserList";
import Register from "./Components/User/Register";


function App() {
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {

      dispatch(loadUser());
      getStripeApiKey();

  }, [dispatch]);

  
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Routes>
        <Route exact path="/" element={[<Navbar />, <Home />, <Footer />]} />
        <Route
          exact
          path="/product/:id"
          element={[<Navbar />, <ProductDetails />, <Footer />]}
        />
        <Route
          exact
          path="/products"
          element={[<Navbar />, <Products />, <Footer />]}
        />
        <Route
          path="/products/:keyword"
          element={[<Navbar />, <Products />, <Footer />]}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/register" element={<Register />} />
        
        <Route
          exact
          path="/account"
          element={[
            <Navbar />,
            <Protected>
              <Profile />
            </Protected>,
          ]}
        />
        <Route
          exact
          path="/cart"
          element={[<Navbar />, <Cart />, <Footer />]}
        />
        <Route
          exact
          path="/login/shipping"
          element={[
            <Navbar />,
            <Protected>
              <Shipping />
            </Protected>,
          ]}
        />

        <Route
          exact
          path="/process/payment"
          element={[
            <Navbar />,
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Protected>
                  <Payment />
                </Protected>
              </Elements>
            ),
          ]}
        />

        <Route
          exact
          path="/success"
          element={[<Navbar />, <Protected> <PaymentSuccess/> </Protected>, <Footer/>]}
        />

        <Route
          exact
          path="/orders"
          element={[<Navbar />, <Protected> <MyOrders/> </Protected>]}
        />

        <Route
          exact
          path="/admin/dashboard"
          element={<Protected isAdmin={true}> <Dashboard/> </Protected>}
        />

        <Route
          exact
          path="/admin/products"
          element={<Protected isAdmin={true}> <ProductList/> </Protected>}
        />

        <Route
          exact
          path="/admin/product"
          element={<Protected isAdmin={true}> <NewProduct/> </Protected>}
        />

        <Route
          exact
          path="/admin/product/:id"
          element={<Protected isAdmin={true}> <UpdateProduct/> </Protected>}
        />

        <Route
          exact
          path="/admin/orders"
          element={<Protected isAdmin={true}> <OrderList/> </Protected>}
        />

        <Route
          exact
          path="admin/order/:id"
          element={<Protected isAdmin={true}> <UpdateOrder/> </Protected>}
        />

        <Route
          exact
          path="admin/users"
          element={<Protected isAdmin={true}> <UserList/> </Protected>}
        />

      </Routes>
    </>
  );
}

export default App;
