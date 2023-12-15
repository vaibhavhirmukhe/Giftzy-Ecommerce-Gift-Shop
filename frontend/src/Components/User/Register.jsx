import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../actions/userAction';
import "./LoginSignUp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {toast} from 'react-hot-toast';
import Loader from '../Loader/Loader';


const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate(); 
    const location = useLocation();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
      
      const [showPassword, setShowPassword] = useState(false);
      const { name, email, password } = user;
    
      const [avatar, setAvatar] = useState("/Profile.png");
      const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    
      const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
      };
    
      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
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
                  <p>REGISTER</p>
                </div>
              </div>
              <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <PersonOutlineOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={showPassword? "text" : "password"}
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <span className="visibility" onClick={()=>setShowPassword(!showPassword)}>
                      {!showPassword ? <VisibilityOffOutlinedIcon style={{position:"absolute", marginRight:"3rem", color:"rgb(50, 50, 50)"}}/> : <VisibilityOutlinedIcon style={{position:"absolute", marginRight:"3rem",color:"rgb(50, 50, 50)"}}/> }
                  </span>
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Register