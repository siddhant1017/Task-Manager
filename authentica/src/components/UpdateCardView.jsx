import React from 'react'
import '../styles/UpdateCardView.css'

import { MdPassword } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useState, useRef } from "react";

function UpdateCardView(props) {

    const [userName, setName] = useState(props.name);
    const [userBio, setBio] = useState(props.bio);
    const [password, setPassword] = useState(props.pwd);
    const [phone, setPhone] = useState(props.phone);
    const [image, setImage] = useState("");

    const inputRef = useRef(null);
    const handleClick = () => {
      console.log(props.email)
      inputRef.current.click();
    };

    const fetchData = () => {

        var formdata = new FormData();
        formdata.append("userName", userName);
        formdata.append("userEmail", props.email);//raj@gmail.com
        // formdata.append("userEmail", "raj@gmail.com");
        formdata.append("userBio", userBio);
        // formdata.append("image", fileInput.files[0], image);
        formdata.append("image", image);
        formdata.append("password", password);
        formdata.append("userMobileNo",phone)
        // console.log(formdata)
        for (var pair of formdata.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://6a03-2605-8d80-6a2-8d78-c878-d91c-85a9-50b4.ngrok.io/authentication/rest/updateUserInfo", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result); var obj = JSON.parse(result); if(obj['status']=='success') alert('Update done'); else alert('Wrong creds');})
        .catch(error => console.log('error', error));

      }

  return (
    <div className='card-1'>
        <div className='update-text'>Update  your details</div>

       <table className='container-items-1'>
            <tr>
                <td><MdMessage className='container-img-1'/></td>
                <td className='container-item-1'>        
                    <input className='input-1' value={userBio} onChange={(e) => setBio(e.target.value)} type='text' placeholder='Enter your bio' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdAccountCircle className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' value={userName} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter your name' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPassword className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPhone className='container-img-1'/></td>
                <td className='container-item-1'>                    
                    <input className='input-1' value={phone} onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Enter your phone number' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><button className='container-button-1' onClick={handleClick} >Select</button></td>
                <td className='container-item-1'>                    
                    <input className='input-1' type='file' onChange={(e) => setImage(e.target.files[0])} ref={inputRef} style={{paddingTop:10, paddingLeft:2}} placeholder='Select your image file' name='uname' required />
                </td>
            </tr>
          </table>
        <button className='container-button-2' onClick={fetchData}>Submit</button>
    </div>
  )
}

export default UpdateCardView