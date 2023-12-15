import React, { Fragment, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login} from "../../actions/userAction";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Loader from "../Loader/Loader";
import {toast} from "react-hot-toast";

const LoginSignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate(); 
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if(error && error!=="Please Login to access this resource"){
      toast.error(error);
      dispatch(clearErrors());
  }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error,navigate, isAuthenticated, redirect]);


  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
          <Link className="Title" to="/">Giftzy.com</Link>
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p>LOGIN</p>
                </div>
              </div>
              <form className="loginForm"  onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <span className="visibility" onClick={()=>setShowPassword(!showPassword)}>
                      {!showPassword ? <VisibilityOffOutlinedIcon style={{position:"absolute", marginRight:"3rem", color:"rgb(50, 50, 50)"}}/> : <VisibilityOutlinedIcon style={{position:"absolute", marginRight:"3rem",color:"rgb(50, 50, 50)"}}/> }
                  </span>
                </div>
                <input type="submit" value="Login" className="loginBtn" />
                <div id="newUser">
                  <p>New User?</p> <Link to="/Register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;