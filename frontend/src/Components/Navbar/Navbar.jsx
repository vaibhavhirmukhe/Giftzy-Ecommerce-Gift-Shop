import React, { useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import UserOptions from '../User/UserOptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Navbar = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate(); 

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };


  return (

    <div className='navbar-container'>
        <p className='logo'>
            <Link to="/">Giftzy.com</Link>
        </p>

        <ul className='navbar-list'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Products">Products</Link></li>
            <li><Link to="/Login">Login</Link></li>
        </ul>

            <form className="searchBox" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search flowers, cakes, gifts ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className='searchIcon' type="submit"><SearchIcon style={{fontSize:"20px"}}/></button>
            </form>

        <ul className='navbar-list-2'>
            <li className='cart-icon'><Link to="/Cart"><ShoppingCartOutlinedIcon style={{fontSize:"1.7rem", color:"rgb(66, 66, 66)"}}/></Link>{cartItems.length!==0 && <span className="cart-item-qty">{cartItems.length}</span>}</li>
            <ul id='userIcon'>
              <li>{isAuthenticated ? <UserOptions user={user}/> : <AccountCircleIcon style={{fontSize:"1.7rem", color:"rgb(66, 66, 66)"}}/>}</li>
              <li style={{fontSize:"0.9rem"}}>{!isAuthenticated && "Guest"}</li>
            </ul>
        </ul>


    </div>
  )
}

export default Navbar