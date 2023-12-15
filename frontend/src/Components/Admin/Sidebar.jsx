import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast";

const Sidebar = () => {
    const dispatch = useDispatch();

    function logoutUser() {
        dispatch(logout());
        toast.success("Logout Successfully");
    }
  return (
    <div className="sidebar">
      <h1 className='dashBoard_logo'>
        <Link to="/" id="title">Giftzy.com</Link>
      </h1>
      <Link to="/admin/dashboard">
        <p>
          <SpaceDashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
          <ListAltIcon />
          Products
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ShoppingBagOutlinedIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleAltOutlinedIcon /> Users
        </p>
      </Link>
      <Link to="">
        <p onClick={logoutUser}>
          <LogoutOutlinedIcon /> Logout
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;