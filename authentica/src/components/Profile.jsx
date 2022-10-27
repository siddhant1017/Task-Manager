import React from 'react'
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import robot from '../assets/animation_500_l8gr8bbx.gif';

import '../styles/Profile.css'

function Profile(props) {
  // var binaryData = [];
  // binaryData.push(props.pic);
  // var imageSrc = URL.createObjectURL(new Blob(binaryData, {type: "image/jpeg"}));
  // console.log(imageSrc)
  if(props.pic[0]=='h'){
    var base64 = props.pic
  }
  else{
    var binary = '';
    var base64;
    var bytes = new Uint8Array( props.pic );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) 
      binary += String.fromCharCode( bytes[ i ] );
      base64 = window.btoa( binary );
      base64 = "data:image/png;base64,"+base64
  }
  

  return (
        <div className='container-root'>
          <div className='circular--landscape'>
              <img className='profilepic' src={base64} />
          </div>

          <div class="line-v-1"></div>

          <table className='container-items'>
            <tr>
                <td><MdAccountCircle className='container-img'/></td>
                <td className='container-item'>{props.name}</td>
            </tr>
            <tr>
                <td><MdEmail className='container-img'/></td>
                <td className='container-item'>{props.email}</td>
            </tr>
          </table>

          <img src={robot} alt="loading..." />

        </div>
      
  )
}

export default Profile