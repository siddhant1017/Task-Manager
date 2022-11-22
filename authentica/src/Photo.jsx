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
    let photoObj={}
        photoObj["photoId"]= null;
        photoObj["loginId"]=null;
        photoObj["photoTitle"]=null;
        photoObj["image"]=null;
        photoObj["imageData"]=null;
        photoObj["catName"]=null;
        photoObj["deleted"]=false;
        photoObj["favourite"]=false;
    
    const onSelectFile=(e)=> {
         const selectedFiles = e.target.files;
         console.log(selectedFiles, imageList);
         //push to onupload function
        const id= uuid();
         console.log(id, state);
         
         photoObj.photoId=id;
         photoObj.loginId=state.res.res.uid;
         photoObj.photoTitle="Burger";
         photoObj.catName= "food";
         photoObj.image=selectedFiles[0];
         photoObj.imageData=URL.createObjectURL(selectedFiles[0]);
         photoObj.deleted=false;
         photoObj.favourite=false;
         console.log(photoObj);
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