import React from 'react';
import SearchArray from './components/SearchArray';
import './style.css';

function SearchPage(props) {
  return (
    <div className="wrapper">
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          textDecoration: 'underline',
        }}>
        Visualize Binary Search!
      </h1>
      <SearchArray />
    </div>
  );
}

export default SearchPage;
