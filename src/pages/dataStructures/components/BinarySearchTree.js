import React, {useState, useEffect} from 'react';
import Tree from 'react-d3-tree';
import {Button} from 'antd';
import TreeData from '../classes/TreeData';

function BinarySearchTree(props) {
  const [treeContainer, setTreeContainer] = useState(null);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const treeData = new TreeData();

  useEffect(() => {
    if (treeContainer != null) {
      const dimensions = treeContainer.getBoundingClientRect();
      console.log(dimensions);
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height * 0.1,
      });
    }
  }, [treeContainer]);

  return (
    <div
      style={{
        height: '75vh',
      }}
      ref={tc => setTreeContainer(tc)}>
      <Tree
        data={treeData.getData()}
        translate={translate}
        orientation="vertical"
      />
      <Button onClick={e => console.log('clicked!')}>add</Button>
    </div>
  );
}

export default BinarySearchTree;
