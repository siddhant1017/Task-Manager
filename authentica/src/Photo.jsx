import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Products } from './components/products';
import contents from './content';
import SearchBar from "./components/SearchBar";
import './styles/photo.css';
import NavBar from "./components/NavBar";
import Tags from "./components/Tags";


export default function Photo() {
   
    function onSelectFile(event) {
         const selectedFiles = event.target.files;
         console.log(selectedFiles);
     }
     return(
        <><div className='Search'>
            <NavBar></NavBar>
            <SearchBar placeholder="Enter Search..." />
            <Tags></Tags>
            </div>
        <div className='App'>
            {contents.map(contents => (
                <Products
                    key={contents.id}
                    image={contents.image}
                    name={contents.name}
                    price={contents.price}
                    totalSales={contents.totalSales}
                    timeLeft={contents.timeLeft}
                    rating={contents.rating} />
            ))}
        </div>
         <><section>
             <label>
                 <br />
                 <input type="file" name="images" className="input1" onChange={onSelectFile}
                     multiple
                     accept="image/png, image/jpeg, image/webp" />
                     <b>UPLOAD</b>
             </label>
         </section></></>
         
     )
 }