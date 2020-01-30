import React, {useState} from 'react';
import SearchArray from './components/SearchArray';
import './style.css';

function SearchPage(props) {
  return (
    <div className="wrapper">
      <SearchArray />
    </div>
  );
}

export default SearchPage;
