import React from 'react';
import BinarySearchTree from './components/BinarySearchTree';

function DSPage(props) {
  return (
    <div style={{textAlign: 'center', margin: '2em'}}>
      <h1 style={{fontWeight: 'bold', textDecoration: 'underline'}}>
        Visualize Binary Search Trees!
      </h1>
      <div>
        <BinarySearchTree />
      </div>
    </div>
  );
}

export default DSPage;
