import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Toaster
        toastOptions={{
          className: "",
          duration: 2000,
        }}
      />
      <App />
    </Router>
  </Provider>
);
