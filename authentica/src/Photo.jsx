import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { Products } from "./components/products";
import contents from "./content";
import SearchBar from "./components/SearchBar";
import "./styles/photo.css";
import NavBar from "./components/NavBar";
import Tags from "./components/Tags";
import Popup from "./components/Popup";
import { v4 as uuid } from "uuid";
import { useLocation } from "react-router-dom";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";

export default function Photo() {
  const { state } = useLocation();
  const [imageList, setImageList] = useState([]);
  const [userFlag, setUserFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setID] = useState();


  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let photoObj = {};
  photoObj["photoId"] = null;
  photoObj["loginId"] = null;
  photoObj["photoTitle"] = null;
  photoObj["imageData"] = null;
  photoObj["catName"] = null;
  photoObj["deleted"] = false;
  photoObj["favourite"] = false;
  let uploadedFile = null;

  useEffect(() => {
    if (!userFlag) {
      getAllImagesByLoginId();
      setUserFlag(true);
    }
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const getAllImagesByLoginId = () => {
    var raw = JSON.stringify({
      loginId: state.res.res.uid,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let allImages;
    fetch("http://localhost:8080/photos/getallphotos", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("images--> ", result);

        allImages = JSON.parse(result);
        let imagesList = [];
        for (let element of allImages) {
          var binary = "";
          var base64;
          photoObj = element;
          //base64String = btoa(String.fromCharCode(...new Uint8Array(element.imageData.data)));
          var bytes = new Uint8Array(element.imageData.data);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
          base64 = window.btoa(binary);
          photoObj.imageData = "data:image/png;base64," + base64;

          // photoObj.photoId=element.photoId;
          // photoObj.loginId=element.loginId;
          // photoObj.photoTitle=element.photoTitle;
          // photoObj.catName= element.catName;
          // photoObj.deleted=element.deleted;
          // photoObj.favourite=element.favourite;

          imagesList.push(photoObj);
        }
        setImageList(imagesList);
      })
      .catch((error) => console.log("error", error));
  };

  const onSelectFile = (e) => {
    uploadedFile = e.target.files[0];
    console.log(uploadedFile, imageList);
    uploadImage();
  };

  const uploadImage = () => {
    //push to onupload function
    const id = uuid();
    console.log(id, uploadedFile);

    photoObj.photoId = id;
    photoObj.loginId = state.res.res.uid;
    photoObj.photoTitle = "Burger";
    photoObj.catName = "food";
    photoObj.deleted = false;
    photoObj.favourite = false;
    console.log(photoObj);
    const formData = new FormData();
    formData.append("image", uploadedFile);
    formData.append("photo", JSON.stringify(photoObj));
    console.log(formData, JSON.stringify(photoObj));
    let requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("http://localhost:8080/photos/add", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
    photoObj.imageData = URL.createObjectURL(uploadedFile);
    setImageList([...imageList, photoObj]);
    console.log(imageList);
  };

  const handleDelete = (id) => {
    setID(id.currentTarget.id)
    togglePopup()
    // const updateList = imageList.filter(
    //   (l) => l.photoId !== id.currentTarget.id
    // );
    // console.log(id.currentTarget.id);
    // console.log(updateList);
    // setImageList(updateList);
  };



  return (
    <>
      <div className="Search">
        <NavBar></NavBar>
        <SearchBar placeholder="Enter Search..." />
        <Tags></Tags>
      </div>
      {isOpen && (
        <Popup
          password={state.res.res.password}
          setImageList={setImageList}
          imageList={imageList}
          id={id}
          setIsOpen={setIsOpen}
          handleClose={togglePopup}
        />
      )}

      <div className="App">
        {imageList.map((contents) => (
          // <Products
          //     key={contents.photoId}
          //     image={contents.imageData}
          //     name={contents.photoTitle} />
          <div className="productList">
            <div key={contents.photoId} className="productCard">
              <img
                src={contents.imageData}
                alt="product-img"
                className="productImage"
              ></img>
              <FaEdit input type="button" className={"productCard__edit"} />
              <FaHeart
                input
                type="button"
                className={"productCard__wishlist"}
              />
              <FaTrash
                input
                type="button"
                id={contents.photoId}
                onClick={handleDelete}
                className={"productCard__trash"}
              />

              <div className="productCard__content">
                <h3 className="productName">{contents.photoTitle}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <>
        <section>
          <label>
            Upload
            <input
              type="file"
              name="images"
              className="input1"
              onChange={(e) => onSelectFile(e)}
              accept="image/png, image/jpeg, image/webp"
            />
          </label>
        </section>
      </>
    </>
  );
}
