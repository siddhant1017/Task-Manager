import React, { useState } from "react";
import NavBar from './components/NavBar';
import { Link, useNavigate } from "react-router-dom";
import './styles/Title.css';



function Title(props){
    const navigate = useNavigate();
        return (
            <><div>
            <NavBar></NavBar><div class="flex-container">
                <div class="flex-child">
                    <p onClick={() => navigate("/todo")}>To_Do</p>
                </div>

                <div class="bg-image">
                    <p onClick={() => navigate("/photo")}>Photo App</p>
                </div>

            </div></div></>

            
        );
    }

export default Title;