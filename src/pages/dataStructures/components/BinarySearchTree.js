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
      <br />
      <Button onClick={e => setTreeData(treeData.add(key))}>testAdd</Button>
      <Button onClick={e => setTreeData(treeData.delete(key))}>
        testDelete
      </Button>
      <br />
      <Button onClick={e => treeData.search(key)}>testSearch</Button>
      <br />
      <Button onClick={e => treeData.findMin()}>testFindMin</Button>{' '}
      <Button onClick={e => treeData.findMax()}>testFindMax</Button>
      <br />
      <Button onClick={e => treeData.succ(key)}>testSucc</Button>
      <Button onClick={e => treeData.pred(key)}>testPred</Button>
    </div>
  );
}

export default BinarySearchTree;
