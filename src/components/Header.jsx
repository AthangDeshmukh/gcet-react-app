import React from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="Header">
      <h1>My Online Shop</h1>
      <nav>
        <Link to="/">Home</Link> - <Link to="/cart">Cart</Link> - <Link to="/order">Order</Link> -
        {user.token ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin</Link>} -
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <hr />
    </div>
  );
}