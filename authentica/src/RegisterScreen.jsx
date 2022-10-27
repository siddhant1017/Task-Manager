import React from 'react'
import './RegisterScreen.css'
import NavBar from './components/NavBar-register';
import RegisterCardView from './components/RegisterCardView';
import update from './assets/animation_500_l8jq4zfg.gif';
import { useLocation } from 'react-router-dom';

function UpdateScreen() {


  return (
    <div className="MainApp">
    <header className="App-header">
        <NavBar title = {"Register"}></NavBar>
    <div className='container-2'>
        <img src={update} alt="loading..." />
        <RegisterCardView></RegisterCardView>
    </div>
    </header>
  </div>
  )
}

export default UpdateScreen