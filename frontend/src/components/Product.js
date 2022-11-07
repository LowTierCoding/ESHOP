import "./Product.css";
import { Link } from "react-router-dom";
import Tilt from 'react-vanilla-tilt';

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    
    <Tilt>
    <div className="productCard">
      <div className="productCardContent">

      <img src={imageUrl} alt={name} />

      <div className="productInfo">
        <p className="infoName">{name}</p>

        <p className="infoDescription">{description.substring(0, 100)}...</p>

        <p className="infoPrice">${price}</p>

      </div>
        <Link to={`/product/${productId}`} className="infoButton">
          View
        </Link>
      </div>
    </div>
    </Tilt>
  );
};

export default Product;