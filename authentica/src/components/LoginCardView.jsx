import React from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/LoginCardView.css';
import { MdEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { FaUserAlt } from 'react-icons/fa';
import google from '../assets/icons8-google-48.svg'
import { useState } from "react";
import { GoogleLogin } from '@moeindana/google-oauth';


function CardView() {
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState("");
  const [userPass, setPass] = useState("");
  
  const fetchData = () => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var obj = {}
        
    obj["email"] = userEmail
    obj["password"] = userPass

    var raw = JSON.stringify(obj);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


  fetch("http://localhost:8080/login", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(requestOptions); var obj = JSON.parse(result); if(obj['status']==true){obj['password']=userPass; navigate("/Todo",{state: { res: obj } });} else alert('Wrong creds');})
  .catch(error => console.log('error', error));

  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log('form submitted ✅');
  };

  const googlelogin = (response) =>{
    var obj = {}
    obj['userBio'] = "NIL" 
    obj['userEmail'] = response['email']
    obj['userName'] = response['name']
    obj['phone'] = response['phone']
    obj['photo'] = response['picture'] 

    var userD = {}
    userD['userDetail'] = obj

    navigate("/Todo",{state: { res: userD } });
  }

  const register = () =>{
    navigate("/register");
  }

  return (
    <div className='form'>
    <form className='contents' onSubmit={handleSubmit}>
      <FaUserAlt className='user'/>
      <header className='header'>Login</header>
      <div className='input-container'>
        <MdEmail style={{color:"#009B77"}}/>
        <input className='input' /*value="raj@gmail.com"*/ onChange={(e) =>{ setEmail(e.target.value); console.log(userEmail); }} type='text' placeholder='Enter your email' name='uname' required />
        {/* <input className='input'  type='text' placeholder='Enter your email' name='uname' required /> */}

      </div>
      <div className='input-container'>
      <MdPassword style={{color:"#009B77"}}/>
        <input className='input' /*value="gkapassd"*/ onChange={(e) =>{ setPass(e.target.value); console.log(userPass); }} type='password' placeholder='Password' name='pass' required />
        {/* <input className='input'  type='password' placeholder='Password' name='pass' required /> */}
      </div>
      <div className='button-container'>
        <input className='button' onClick={fetchData} type='submit' />
      </div>
      <p className='login'>Or login with</p>
      {/* <img src={google} alt="loading..." /> */}
      <div  className="google-login">
      
      <GoogleLogin
        onSuccess={response => {
          console.log(response);
          googlelogin(response);
        }}
        onError={() => {
          console.log('Login Failed');
        }}/>
      </div>
      
      <br></br>
      <div class="line-1"></div>
      <a className='register' onClick={register} href=''>Register</a>
      
    </form>
  </div>
  )
}

export default CardView