import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Products } from './components/products';
import contents from './content';
import SearchBar from "./components/SearchBar";
import './styles/photo.css';
import NavBar from "./components/NavBar";
import Tags from "./components/Tags";
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router-dom';

export default function Photo() {
    const { state } = useLocation();
    const [imageList, setImageList] = useState([]);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let photoObj={}
        photoObj["photoId"]= null;
        photoObj["loginId"]=null;
        photoObj["photoTitle"]=null;
        photoObj["imageData"]=null;
        photoObj["catName"]=null;
        photoObj["deleted"]=false;
        photoObj["favourite"]=false;
    let uploadedFile=null;

    const onSelectFile=(e)=> {
         uploadedFile = e.target.files[0];
         console.log(uploadedFile, imageList);
         uploadImage();
    }
    
    const uploadImage=()=>{

         //push to onupload function
        const id= uuid();
         console.log(id, uploadedFile);
         
         photoObj.photoId=id;
         photoObj.loginId=state.res.res.uid;
         photoObj.photoTitle="Burger";
         photoObj.catName= "food";
         photoObj.deleted=false;
         photoObj.favourite=false;
         console.log(photoObj);
         const formData= new FormData();
         formData.append("image", uploadedFile );
         formData.append("photo",JSON.stringify(photoObj));
         console.log(formData, JSON.stringify(photoObj));
         let requestOptions = {
            method: 'POST',
            body: formData,
          };
          fetch("http://localhost:8080/photos/add", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result); })
          .catch(error => console.log('error', error));
          photoObj.imageData=URL.createObjectURL(uploadedFile);
         setImageList([...imageList,photoObj]);
         console.log(imageList);
         
     }

     return(
        <><div className='Search'>
            <NavBar></NavBar>
            <SearchBar placeholder="Enter Search..." />
            <Tags></Tags>
            </div>
        <div className='App'>
            {imageList.map(contents => (
                <Products
                    key={contents.photoId}
                    image={contents.imageData}
                    name={contents.photoTitle} />
            ))}
        </div>
         <><section>
             <label>
                Upload
                 <input type="file" name="images" className="input1" onChange={(e) =>onSelectFile(e)}
                     accept="image/png, image/jpeg, image/webp" />
                       
             </label>
         </section></></>
         
     )
 }