import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
const Navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    setOrderValue(
      products.reduce((sum, value) => {
        return sum + value.price * (cart[value.pid] ?? 0);
      }, 0)
    );
  }, [products, cart]);

  const increment = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decrement = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] = newCart[id] - 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const placeOrder = async () => {
    const url = `${API}/orders/new`;
    await axios.post(url, { email: user.email, orderValue: orderValue });
    setCart({});
    Navigate("/order")
  };

  const loginToOrder = () => {
    Navigate("/login")
  }

  return (
  <div className="Cart-Container">
    <div className="Cart-Title">My Cart</div>
    {products &&
      products.map(
        (value) =>
          cart[value.pid] && (
            <div className="Cart-Item" key={value.pid}>
              <span className="Cart-Item-Name">{value.name}</span>
              <span className="Cart-Item-Price">₹{value.price}</span>
              <div className="Cart-Item-Controls">
                <button className="Cart-Button" onClick={() => decrement(value.pid)}>-</button>
                <span className="Cart-Item-Qty">{cart[value.pid]}</span>
                <button className="Cart-Button" onClick={() => increment(value.pid)}>+</button>
              </div>
              <span className="Cart-Item-Price">₹{value.price * cart[value.pid]}</span>
            </div>
          )
      )}
    <hr />
    <div className="Cart-OrderValue">Order Value: ₹{orderValue}</div>
    <hr />
    <div className="Cart-Action">
      {user.name ? (
        <button className="Cart-Button" onClick={placeOrder}>Place Order</button>
      ) : (
        <button className="Cart-Button" onClick={loginToOrder}>Login to Order</button>
      )}
    </div>
  </div>
);
}