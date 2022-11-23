import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { Products } from './components/products';
import contents from './content';
import SearchBar from "./components/SearchBar";
import './styles/photo.css';
import NavBar from "./components/NavBar";
import Tags from "./components/Tags";
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaTrash, FaEdit} from 'react-icons/fa';


export default function Photo() {
    const { state } = useLocation();
    const [imageList, setImageList] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [userFlag, setUserFlag]= useState(false);
    const [tagsList, setTagsList]= useState([]);

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


    useEffect(() => {   if(!userFlag){
        getAllImagesByLoginId();
        setUserFlag(true);
      }  });
    const getAllImagesByLoginId=()=>{
        var raw = JSON.stringify({
            "loginId": state.res.res.uid 
          });
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,          
            body: raw,          
            redirect: 'follow'          
          };
          let allImages;
          fetch("http://localhost:8080/photos/getallphotos", requestOptions) 
            .then(response => response.text())
            .then(result => {
                console.log("images--> ",result);
               
                allImages= JSON.parse(result);
                let imagesList=[];
                let tagList=[];
                tagList.push("All");
                for(let element of allImages){
                    photoObj=element;

                    //converting array buffer to base64 image
                    var binary = '';
                    var base64;
                    var bytes = new Uint8Array( element.imageData.data );
                    var len = bytes.byteLength;
                    for (var i = 0; i < len; i++) 
                        binary += String.fromCharCode( bytes[ i ] );
                    base64 = window.btoa( binary );
                    photoObj.imageData = "data:image/png;base64,"+ base64;
                    
                    imagesList.push(photoObj);

                    //for tags list
                    if(!tagList.includes(element.catName)){
                        tagList.push(element.catName);
                    }
                }
                setTagsList(tagList);
                setImageList(imagesList);
                setFilteredResults(imagesList);
            })
            .catch(error => console.log('error', error));
    }
    
    const searchItems = (searchInput,type) => {
        if (searchInput !== '' && type=="Input") {
            const filteredData = imageList.filter((item) => {
                
                return (Object.values(item.photoTitle).join('').toLowerCase().includes(searchInput.toLowerCase())) ||
                (Object.values(item.catName).join('').toLowerCase().includes(searchInput.toLowerCase()))
            })
            setFilteredResults(filteredData)
        }else if(searchInput !== '' && type=="Tags") {
            const filteredData = imageList.filter((item) => {
                
                return Object.values(item.catName).join('').toLowerCase().includes(searchInput.toLowerCase());
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(imageList)
        }
        
    }

    const onFilterWithTags=(e)=>{
        console.log(e);
        if(e.target.id=="All"){
            setFilteredResults(imageList)
        }else{

            searchItems(e.target.id.toString(),"Tags");
        }
    }
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
          if(!tagsList.includes(photoObj.catName)){
            setTagsList([...tagsList, photoObj.catName]);
        }
         setImageList([...imageList,photoObj]);
         setFilteredResults([...imageList,photoObj]);
         console.log(imageList);
         
     }
    
    const [isHovering, setIsHovering] = useState(false);

     return(
        <><div className='Search'>
            <NavBar></NavBar>
            <div className="searchInputs">
            <input
          type="text" placeholder="Enter Search..." onChange={(e) => searchItems(e.target.value.toString(),"Input")}
        />
        </div>
        <div className="tags">
            {tagsList.map(tag=>(
                <button id={tag} className="button-1" onClick={(e) => onFilterWithTags(e)}> {tag} </button>

            ))}
            
        </div>
            </div>
        <div className='App'>
            {filteredResults.map(contents => (
                <div className='productList'>
                <div key={contents.photoId} className='productCard' onMouseOver = {() =>setIsHovering(true)} onMouseOut = {()=> setIsHovering(false)}>
                    <img src={contents.imageData} alt='product-img' className='productImage'></img>
                    {isHovering && (
                    
                    <div className='productCard__content'>
                    <h3 className='productName'>{contents.photoTitle}</h3>
                    <FaEdit input type="button" className={"productCard__edit"} />
                    <FaHeart input type="button" className={"productCard__wishlist"} />
                    <FaTrash input type="button" className={"productCard__trash"} />
    
                    </div> 
                    )};
                    
                </div>
            </div>
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