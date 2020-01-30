import React from 'react';
import SearchArray from './components/SearchArray';
import './style.css';

function SearchPage(props) {
  return (
    <div>
      <div className="wrapper">
        <SearchArray />
      </div>
    </div>
  );
}

export default SearchPage;
