import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import Loader from "../Loader/Loader";

const Profile = () => {

    const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (

        <div className="profileCon">
            <div className="profileImage">
                <img src={user.avatar.url} alt={user.name} />
                <p>{user?.email}</p>
                <div className="orderButton"><Link to="/orders">My Orders</Link></div>
            </div>
            <div className="profileDetails">
                <h3>Profile Details</h3>
                    <div>
                        <p>Full Name </p>
                        <p>{user?.name}</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <p>Joined On</p>
                        <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div>
            </div>
        </div>

      )}
    </Fragment>
  );
};

export default Profile;