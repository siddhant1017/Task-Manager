import React, { useState } from "react";
import NavBar from './components/NavBar';
import { Link, useNavigate } from "react-router-dom";
import './styles/Title.css';

import { useLocation } from 'react-router-dom';


function Title(props){
    const { state } = useLocation();
    const navigate = useNavigate();
        return (
            <div>
            <NavBar></NavBar>
            <div class="flex-container">
                <div class="flex-child" onClick={() => navigate("/todo",{state: { res: state} })}>
                    <div class="todo-image">

                    </div>
                </div>

                <div class="bg-image" onClick={() => navigate("/photo",{state: { res: state } })}>
                    <div class="photo-image">
                    </div>
                </div>

            </div></div>

            
        );
    }

export default Title;