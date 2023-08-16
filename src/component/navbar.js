import React from "react";
import {NavLink,Link,useNavigate} from 'react-router-dom'



export default function Navbar(props) {
 

  const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.removeItem('token')
  navigate("/login")
  props.showAlert("you are successfully logout","success")
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-light position-sticky top-0">
        <div className="container-fluid">
          <h4 className="mx-2">Navbar</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
           
           {!localStorage.getItem('token') ? <div>
           <Link className="btn btn-outline-success mx-2" to="/login" role="button">
                Login
              </Link>
            <Link className="btn btn-outline-success mx-2" to="/signup" role="button">
                Sign Up
              </Link> 
              </div> :<div className=" dropstart">
  <span className=" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-user"></i>
  </span>
  <ul className="dropdown-menu">
  <li className="dropdown-item">{props.userDetailes.name}</li>
    <li className="dropdown-item">{props.userDetailes.email}</li>
  </ul>
 <button  className="btn btn-outline-success mx-2" onClick={handleLogout}>Logout</button> </div>}
          </div>
        </div>
      </nav>
    </>
  );
}
