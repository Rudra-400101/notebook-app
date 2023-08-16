import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const { showAlert } = props;

  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const onchange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
   props.getUserDetailes()
      showAlert("you are successfully Signup", "success");
    } else {
      showAlert("please fill details carefully", "danger");
    }
  };
  return (
    <>
    <h2 className="mt-5">Signup page</h2>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={signup.title}
            placeholder="Here Write Your Name"
            onChange={onchange}
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={onchange}
            value={signup.email}
            id="email"
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
            value={signup.password}
            id="password"
          />
          <label htmlFor="cpassword" className="form-label">
            confirm Password
          </label>
          <input
            type="text"
            className="form-control"
            name="cpassword"
            onChange={onchange}
            value={signup.password}
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </>
  );
}
