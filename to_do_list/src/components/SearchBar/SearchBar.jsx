import React from 'react';
import './SearchBar.css'; 

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    
    

<div>
	<label>Search</label>
	<input
      type="search"
      id="search"
      name="search"
      pattern=".*\S.*" required
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
	<span className="caret"></span>

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