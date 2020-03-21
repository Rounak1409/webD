import React, {useState} from 'react';
import {Select} from 'antd';
import BinarySearchTree from './components/BinarySearchTree';
import AVLTree from './components/AVLTree';

function DSPage(props) {
  const [ds, setDs] = useState('AVL');
    const {Option} = Select;
  return (
    <div style={{textAlign: 'center', margin: '1em'}}>
        <h1 style={{fontWeight: 'bold'}}>
        Choose the Data Structure:
            <Select defaultValue={ds} onChange={e => setDs(e)} style={{margin: '0 1em', width: '12em'}}>
                <Option value='BST'>Binary Search Tree</Option>
                <Option value='AVL'>AVL Tree</Option>
            </Select>
      </h1>
      <div>
        {ds === 'BST' && <BinarySearchTree />}
        {ds === 'AVL' && <AVLTree />}
      </div>
    </div>
  );
}

export default DSPage;
