import React, {useState} from 'react';
import {Button} from 'antd';
import BinarySearchTree from './components/BinarySearchTree';
import AVLTree from './components/AVLTree';

function DSPage(props) {
  const [ds, setDs] = useState('AVL');
  return (
    <div style={{textAlign: 'center', margin: '1em'}}>
        <Button onClick={e => setDs('BST')}>BST</Button>
        <Button onClick={e => setDs('AVL')}>AVL</Button>
      <h1 style={{fontWeight: 'bold', textDecoration: 'underline'}}>
        {ds === 'BST' && 'Visualize Binary Search Trees!'}
        {ds === 'AVL' && 'Visualize AVL Trees!'}
      </h1>
      <div>
        {ds === 'BST' && <BinarySearchTree />}
        {ds === 'AVL' && <AVLTree />}
      </div>
    </div>
  );
}

export default DSPage;
