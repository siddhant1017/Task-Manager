import React, { useState } from "react";
import "./SearchBar.css";
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);

  const clearInput = () => {
    setFilteredData([]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <AiOutlineSearch />
          ) : (
            <AiFillCloseCircle id="clearBtn" onClick={clearInput} />
          )}
          </div>
      </div>
      
    </div>
  );
}

export default SearchBar;
