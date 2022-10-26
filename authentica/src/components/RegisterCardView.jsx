import React from 'react'
import '../styles/RegisterCardView.css'

import { MdPassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useState, useRef } from "react";

function UpdateCardView() {

    const [userName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userEmail, setuserEmail] = useState("");
   

    const fetchData = () => {
        if(confirmPassword!=password){
            alert("Passwords don't match")
            return
        }

        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        var obj = {}
        
        obj["email"] = userEmail
        obj["password"] = password
        obj["username"] = userName

        var raw = JSON.stringify(obj);
        

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/register", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result); var obj = JSON.parse(result); if(obj['status']==true) alert('Registered'); else alert('Error');})
        .catch(error => console.log('error', error));
    }

  return (
    <div className='card-1'>
        <div className='update-text'>Enter your details</div>

       <table className='container-items-1'>
            <tr>
                <td><MdAccountCircle className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter your name' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdEmail className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setuserEmail(e.target.value)} type='text' placeholder='Enter your email' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPassword className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPassword className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm password' name='uname' required />
                </td>
            </tr>
          </table>
        <button className='container-button-2' onClick={fetchData}>Submit</button>
    </div>
  )
}

export default UpdateCardView