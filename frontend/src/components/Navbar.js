import React from 'react'
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let navigate = useNavigate();
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

const LogOut = () => {
  localStorage.removeItem("authToken");
  navigate(0);
}

const LoginRegister = () => {
  const isLoggedIn = localStorage.getItem("authToken");
  if (!isLoggedIn) {
    return (
      <>
        <li>
          <Link to="/register">
            <span className='icon'><i className="fa fa-registered" aria-hidden="true"></i></span>
            <span className='text'>Register</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span className='icon'><i className="fa fa-sign-in" aria-hidden="true"></i></span>
            <span className='text'>Login</span>
          </Link>
        </li>
      </>
    )
  }
  else {
    return(
      <li>
          <a href="/" onClick={LogOut}>
            <span className='icon'><i className="fa fa-sign-in" aria-hidden="true"></i></span>
            <span className='text'>Logout</span>
          </a>
      </li>
    )
  }
};
  return (
    <nav className="navbar">
        <a href="/">

        <div className="navbarLogo">
          <span><i>C</i></span>
          <span><i>U</i></span>
          <span><i>S</i></span>
          <span><i>T</i></span>
          <span><i>O</i></span>
          <span><i>M</i></span>
        </div>
        </a>

      <ul className="navbarLinks">
        {LoginRegister()}
        <li>
          <Link to="/cart" className="cartLink">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogoBadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <a href="/">
            <span className='icon'><i className="fa fa-shopping-bag" aria-hidden="true"></i></span>
            <span className='text'>Shop</span>
          </a>
        </li>
      </ul>

      <div className="menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;