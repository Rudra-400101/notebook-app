import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const { showAlert,getUserDetailes } = props;
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onchange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email: login.email, password: login.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("you are successfully login", "success");
      getUserDetailes()
    } else {
      showAlert("please login with correct details", "danger");
    }
  };

  return (
    <>
    <h2 className="mt-5">Login page</h2>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="mb-2">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={onchange}
            value={login.email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={onchange}
            value={login.password}
            id="password"
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
}
