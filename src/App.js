import "./App.css";
import Navbar from "./component/navbar";
import Home from "./component/home";
import About from "./component/about";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/notestate";
import Signup from "./component/signup";
import Login from "./component/login";
import Alert from "./component/alert";
import {useState,useEffect } from "react";

function App() {

  const [userDetailes,setUserDetailes]=useState('')
  const host = "http://localhost:5000";
useEffect(()=>{
  getUserDetailes()
},[])
  const getUserDetailes =async () => {
    
    // fetch api
    const response = await fetch(
      `${host}/api/auth/getuser`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        body:JSON.stringify()
      });
      const json= await response.json();
    setUserDetailes(json)
  };   

  const [alert, setAlert] = useState({
    display: "d-none",
  });
  const showAlert = (messege, type) => {
    setAlert({
      messege: messege,
      type: type,
      display: "d-block",
    });
    setTimeout(() => {
      setAlert({ display: "d-none" });
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} userDetailes={userDetailes} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About showAlert={showAlert} />} />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} getUserDetailes={getUserDetailes}/>}
              />
              <Route path="/login" element={<Login showAlert={showAlert} getUserDetailes={getUserDetailes}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
