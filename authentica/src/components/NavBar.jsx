import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/NavBar.css'

function NavBar(props) {
  const navigate = useNavigate();
  return (
    <nav className="navigation">
            <h1 className="title">Welcome User</h1>
            <div className="button-container-1">
            <button className="button-1" onClick={() => navigate("/update", {state: { res : props }})}>Update</button>
            <button className="button-1" onClick={() => navigate("/")}>Log out</button>
            </div>
        </nav>
  )
}


export default NavBar;