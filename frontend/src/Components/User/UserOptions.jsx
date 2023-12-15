import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDial from '@mui/material/SpeedDial';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const UserOptions = ({ user }) => {
//   const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <SpaceDashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
//   function cart() {
//     navigate("/cart");
//   }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <Fragment>
      <SpeedDial
         FabProps={{ size: "small" }}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;