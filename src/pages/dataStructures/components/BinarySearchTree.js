import React from 'react';
import Tree from 'react-d3-tree';

function BinarySearchTree(props) {
  const myTreeData = [
    {
      name: 'Top Level',
      attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
      },
      children: [
        {
          name: 'Level 2: A',
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
        },
        {
          name: 'Level 2: B',
        },
      ],
    },
  ];
  return (
    <div>
      <Tree data={myTreeData} />
    </div>
  );
}

export default BinarySearchTree;
