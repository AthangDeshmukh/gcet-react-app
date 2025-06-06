import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // <-- Make sure this import is present

export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    const url = `${API}/users/login`;
    const found = await axios.post(url, user);
    console.log(found)

    if (found.data.email) {
      setUser(found.data);
      Navigate("/");
    } else {
      setMsg("Invalid User or Password");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="Login-Container">
      <form
        className="Login-Box"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Login</h3>
        {msg && <p style={{ color: "red" }}>{msg}</p>}
        <input
          type="text"
          placeholder="Email address"
          className="Login-Input"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="Login-Input"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={goToRegister}>
          Create Account
        </button>
      </form>
    </div>
  );
}