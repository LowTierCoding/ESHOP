import React from 'react'
import './HomeScreen.css'
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Product from "../components/Product";
import {getProducts as listProducts} from '../redux/actions/productActions';



const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector(state => state.getProducts);
  const {products, loading, error} = getProducts;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <div className='homeScreen'>
      <div className='homeScreenProducts'>
        {loading ? (
          <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
            ) : (
              products && products.map((product) => <Product
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              />)
        )}
      </div>
    </div>
  )
}

export default HomeScreen