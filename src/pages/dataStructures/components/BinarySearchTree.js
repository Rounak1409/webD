import React, {useState, useEffect} from 'react';
import Tree from 'react-d3-tree';
import {Button, InputNumber} from 'antd';
import TreeData from '../classes/TreeData';

function BinarySearchTree(props) {
  const [treeContainer, setTreeContainer] = useState(null);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });
  const [treeData, setTreeData] = useState(new TreeData(null));
  const [key, setKey] = useState(5);
  const [val, setVal] = useState(5);

  useEffect(() => {
    if (treeContainer != null) {
      const dimensions = treeContainer.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height * 0.1,
      });
    }
  }, [treeContainer]);

  return (
    <div>
      <div
        style={{
          height: '75vh',
        }}
        ref={tc => setTreeContainer(tc)}>
        <Tree
          data={treeData.getData()}
          translate={translate}
          orientation="vertical"
          transitionDuration={0}
        />
      </div>
      Key: <InputNumber min={0} defaultValue={key} onChange={e => setKey(e)} />{' '}
      Val(if adding):{' '}
      <InputNumber min={0} defaultValue={val} onChange={e => setVal(e)} />
      <br />
      <Button
        onClick={e => {
          const addKey = key;
          const addVal = val;
          setTreeData(treeData.add(addKey, addVal));
        }}>
        testAdd
      </Button>
      <br />
      <Button onClick={e => treeData.search(key)}>testSearch</Button>
    </div>
  );
}

export default BinarySearchTree;
