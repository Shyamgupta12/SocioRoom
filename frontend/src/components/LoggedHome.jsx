import React from 'react'
// import "./LoggedHome.css";
import Searchbar from './SearchBar';

const LoggedHome = () => {
  return (
    <div className='LoggedHome'>
        <div className='search-bar-container'>
         <Searchbar />
          {/* <div>SearchResults</div> */}
        </div>
      
    </div>
  )
}

export default LoggedHome