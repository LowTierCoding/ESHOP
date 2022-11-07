import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/CartItem";

import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import Tilt from 'react-vanilla-tilt';

const CartScreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => { }, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const BuyProduct = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      alert("You must be logged in to buy a product!");
      return navigate('/register');
    }
    else if (isLoggedIn && JSON.parse(localStorage.getItem("cart")).length === 0) {
      alert("You don't have anything in your cart!")
    }
    else {
      const products = JSON.parse(localStorage.getItem("cart"));
      for (var i = 0; i < products.length; i++) {
        removeFromCartHandler(products[i]["product"]);
      }
      return navigate('/confirmpurchase');
    }
  };

  return (
    <>
    
      <div className="cartScreen">
          <div className="cartScreenLeft">
    <Tilt>
            <h2>Shopping Cart</h2>

            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty <a href="/">Go Back</a>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
                />
                ))
                )}
                </Tilt>
          </div>

        <div className="cartScreenRight">
        <Tilt>
          <div className="cartScreenInfo">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button type="button" onClick={BuyProduct}>Buy Product</button>
          </div>
      </Tilt>
        </div>
      </div>
    </>
  );
};

export default CartScreen;