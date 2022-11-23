import React, { useState, useEffect } from "react";
import "../styles/Popup.css" 

function Popup(props) {
    const [pass, setPass] = useState("");







    const checkAuth = () =>{
        if(pass==props.password){
            props.imageList.forEach((element)=>{
                if(element.photoId==props.id){

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                    "photoId": element.photoId,
                    "loginId": element.loginId,
                    "catName": element.catName,
                    "deleted": true,
                    "favourite": element.favourite
                    });

                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };

                    fetch("http://localhost:8080/photos/delete", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        const updateList = props.imageList.filter(
                            (l) => l.photoId !== props.id
                        );
                        props.setImageList(updateList)
                        props.setIsOpen(false)
                    })
                    .catch(error => console.log('error', error));
                
                }
                // console.log(element)
            })
        }
        else{
            alert("wrong creds")
        }
    }

  return (
    <div className="popup-box">
        <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <h1 className="popup-box-header">Enter your password</h1>
        <input name="Password" type="text" onChange={(e) => setPass(e.target.value)}></input>
        <button onClick={checkAuth}>Delete</button>
        {/* {props.content} */}
      </div>
    </div>
  )
}

export default Popup