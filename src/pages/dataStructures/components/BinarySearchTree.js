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
          border: '0.5em double cornflowerblue',
          borderRadius: '2em',
        }}
        ref={tc => setTreeContainer(tc)}>
        <Tree
          data={treeData.getData()}
          translate={translate}
          orientation="vertical"
          transitionDuration={0}
        />
      </div>
      <div style={{textAlign: 'left', marginTop: '1em'}}>
        <h2>
          Key:{' '}
          <InputNumber min={0} defaultValue={key} onChange={e => setKey(e)} />{' '}
        </h2>
        <h2>Operations</h2>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="plus"
          onClick={e => setTreeData(treeData.add(key))}>
          Insert
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="cross"
          onClick={e => setTreeData(treeData.delete(key))}>
          Delete
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="search"
          onClick={e => treeData.search(key)}>
          Find
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="fall"
          onClick={e => treeData.findMin()}>
          FindMin
        </Button>{' '}
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="rise"
          onClick={e => treeData.findMax()}>
          FindMax
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="right"
          onClick={e => treeData.succ(key)}>
          Successor
        </Button>
        <Button
          onClick={e => treeData.pred(key)}
          shape="round"
          type="primary"
          icon="left">
          Predecessor
        </Button>
      </div>
    </div>
  );
}

export default BinarySearchTree;
