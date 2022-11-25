import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/NavBar.css'

function Tags(props) {
  const navigate = useNavigate();
  return (

            <div className="button-container-2 tags">
            <button className="button-1" onClick={() => navigate("")}> #Family </button>
            <button className="button-1" onClick={() => navigate("")}> #Friends</button>
            <button className="button-1" onClick={() => navigate("")}> #Cars</button>
            <button className="button-1" onClick={() => navigate("")}> #Bikes</button>
            </div>
  )
}


export default Tags;