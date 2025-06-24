import React from 'react';
import './SearchBar.css'; 
import { FaSearch } from 'react-icons/fa';


const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    
    
  <div className="search-box">
    <button className="btn-search">
      <FaSearch />
    </button>

    <input
      type="search"
      className="input-search"
      name="search"
      pattern=".*\S.*" required
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}/>
  

         {/* <input
      type="search"
      className="search-input"
      name="search"
      pattern=".*\S.*" required
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    /> */}
        </div>



       

    



   
  );
};

export default SearchBar;