import React, { useState, useEffect } from "react";
import "../styles/Popup.css";

function Popup(props) {
  const [pass, setPass] = useState("");
  const [tag, setTag] = useState("");
  const [source, setSource] = useState("");
  const [file, setFile] = useState("");

  const confirmAuth = () => {
    if (pass == props.password) {
      props.filteredResults.forEach((element) => {
        if (element.photoId == props.id) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            photoId: element.photoId,
            loginId: element.loginId,
            catName: element.catName,
            deleted: true,
            favourite: element.favourite,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://localhost:8080/photos/delete", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              const updateList = props.filteredResults.filter(
                (l) => l.photoId !== props.id
              );
              props.setFilteredResults(updateList);
              console.log(updateList);
              props.setIsOpen(false);
            })
            .catch((error) => console.log("error", error));
        }
      });
    } else {
      alert("wrong creds");
    }
  };

  const submit = () => {
    var formdata = new FormData();
    formdata.append("updatedImage", file);

    var photoObj = {};

    props.filteredResults.forEach((element) => {
      if (element.photoId == props.id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        photoObj.photoId = element.photoId;
        photoObj.loginId = element.loginId;
        photoObj.photoTitle = tag; //element.photoTitle
        photoObj.catName = element.catName;
        photoObj.deleted = element.deleted;
        photoObj.favourite = element.favourite;

        formdata.append("photo", JSON.stringify(photoObj));

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        console.log(JSON.stringify(photoObj));
        console.log(formdata);

        fetch("http://localhost:8080/photos/edit", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            props.setIsOpen(false);

            console.log(file.value)
            // var binary = "";
            // var base64;
            // var bytes = new Uint8Array(file);
            // var len = bytes.byteLength;
            // for (var i = 0; i < len; i++)
            //   binary += String.fromCharCode(bytes[i]);
            // base64 = window.btoa(binary);
            // photoObj.imageData = "data:image/png;base64," + base64;
            photoObj.imageData = URL.createObjectURL(file)
            const removedList = props.filteredResults.filter(
              (e) => e.photoId !== props.id
            );
            const updatedList = [photoObj, ...removedList];
            props.setFilteredResults(updatedList);
          })
          .catch((error) => console.log("error", error));
      }
    });

    // formdata.append("photo", JSON.stringify(photoObj));

    // var requestOptions = {
    //   method: "POST",
    //   body: formdata,
    //   redirect: "follow",
    // };

    // console.log(JSON.stringify(photoObj));
    // console.log(formdata);

    // fetch("http://localhost:8080/photos/edit", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) =>{
    //     console.log(result)
    //     props.setIsOpen(false);

    // })
    //   .catch((error) => console.log("error", error));
  };

  {
    if (props.func == 1)
      return (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>
              x
            </span>
            <h1 className="popup-box-header">Enter your password</h1>
            <input
              name="Password"
              type="text"
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <button onClick={confirmAuth}>Delete</button>
          </div>
        </div>
      );
    else if (props.func == 2)
      return (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>
              x
            </span>
            <h1 className="popup-box-header">Edit your file</h1>
            {/* <img src={""} alt=""></img> */}
            <input
              name="tag"
              type="text"
              placeholder="Enter the tag"
              onChange={(e) => setTag(e.target.value)}
            ></input>

            <input
              className="upload"
              type="file"
              name="images"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/png, image/jpeg, image/webp"
            ></input>
            <button onClick={submit}>Submit</button>
          </div>
        </div>
      );
    else
      return (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>
              x
            </span>
            <h1 className="popup-box-header">Enter your password</h1>
            <input
              name="Password"
              type="text"
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <button onClick={confirmAuth}>Delete</button>
          </div>
        </div>
      );
  }
  //   return (
  //     <div className="popup-box">
  //         <div className="box">
  //         <span className="close-icon" onClick={props.handleClose}>x</span>
  //         <h1 className="popup-box-header">Enter your password</h1>
  //         <input name="Password" type="text" onChange={(e) => setPass(e.target.value)}></input>
  //         <button onClick={checkAuth}>Delete</button>
  //       </div>
  //     </div>
  //   )
}

export default Popup;
