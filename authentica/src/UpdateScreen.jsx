import React from 'react'
import './UpdateScreen.css'
import NavBar from './components/NavBar-update';
import UpdateCardView from './components/UpdateCardView';
import update from './assets/animation_500_l8gzt8ey.gif';
import { useLocation } from 'react-router-dom';

function UpdateScreen() {

  const { state } = useLocation();
  const { res } = state;

  return (
    <div className="MainApp">
    <header className="App-header">
        <NavBar></NavBar>
    <div className='container-2'>
        <img src={update} alt="loading..." />
        <UpdateCardView pwd = {res.pwd} pic = {res.pic} bio = {res.bio} email = {res.email} name = {res.name} phone = {res.phone}></UpdateCardView>
    </div>
    </header>
  </div>
  )
}

export default UpdateScreen