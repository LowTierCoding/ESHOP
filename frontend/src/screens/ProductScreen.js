import React from 'react'
import './ProductScreen.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProductDetails } from '../redux/actions/productActions'
import {addToCart} from '../redux/actions/cartActions'
import { useParams, useNavigate } from 'react-router-dom'
import Tilt from 'react-vanilla-tilt';
const ProductScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.getProductDetails);
  const {loading, error, product} = productDetails;

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, product, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    return navigate(`/cart`);
  };

  return (
    <div className="productScreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>

          <div className="productScreenLeft">
        <Tilt>
            <div className="leftImage">
              <img src={product.imageUrl} alt={product.name} />
            </div>
        </Tilt>
            <Tilt>
            <div className="leftInfo">
              <p className="leftName">{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
              </Tilt>
          </div>
          <div className="productScreenRight">
          <Tilt>
            <div className="rightInfo">
              <p>
                Price:
                <span>${product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </Tilt>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;