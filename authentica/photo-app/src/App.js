import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Products } from './components/products';
import contents from './content';
import SearchBar from "./components/SearchBar";
import "./App.css";


export default function App() {
   
   function onSelectFile(event) {
        const selectedFiles = event.target.files;
        console.log(selectedFiles);
    }
    return(
       
        <><div className='App'>
            <SearchBar placeholder="Enter Category..." />
            {contents.map(contents => (
                <Products
                    key={contents.id}
                    image={contents.image}
                    name={contents.name}
                     />
            ))}
        </div>
        <><section>
            <label>
                <br />
                <input type="file" name="images" className="input1" onChange={onSelectFile}
                    multiple
                    accept="image/png, image/jpeg, image/webp" />
            </label>
        </section></></>
        
    )
}