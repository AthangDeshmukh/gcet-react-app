import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await axios.get("${API_URL}/products");
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="product-container">
      <h3>Welcome {user.name}!</h3>
      <ul className="product-grid">
        {products &&
          products.map((product, index) => (
            <li key={index} className="product-item">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-title">{product.name}</div>
              <div className="product-price">${product.price}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}