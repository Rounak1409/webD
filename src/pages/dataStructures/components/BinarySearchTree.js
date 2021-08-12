import React, {useState, useEffect} from 'react';
import Tree from 'react-d3-tree';
import {Button, InputNumber, message} from 'antd';
import BSTTreeData from '../classes/BSTTreeData';

function BinarySearchTree(props) {
  const [treeContainer, setTreeContainer] = useState(null);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });
  const [treeData, setTreeData] = useState(new BSTTreeData(null));
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
          height: '72.5vh',
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
          <InputNumber defaultValue={key} onChange={e => setKey(e)} />{' '}
        </h2>
        <h2>BST Operations:</h2>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="plus"
          onClick={e => {
            const searchedNode = treeData.search(key);
            if (searchedNode.key === key) {
              message.error(`Key ${key} is already in the BST Tree!`);
            } else {
              setTreeData(treeData.add(key));
            }
          }}>
          Insert
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="cross"
          onClick={e => {
            const searchedNode = treeData.search(key);
            if (searchedNode.key !== key) {
              message.error(`Did not find ${key} in the BST`);
            } else {
              const min = treeData.findMin();
              const max = treeData.findMax();
              if (min.key === max.key) {
                // only 1 node in tree, cannot delete
                message.error(
                  `Cannot delete ${key} as it is the only node in the BST!`,
                );
              } else {
                setTreeData(treeData.delete(key));
              }
            }
          }}>
          Delete
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="search"
          onClick={e => {
            const searchedNode = treeData.search(key);
            if (searchedNode.key !== key) {
              message.error(`Did not find ${key} in the BST`);
            } else {
              message.success(`Found ${key}!`);
            }
          }}>
          Find
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="fall"
          onClick={e =>
            message.success(`Minimum is ${treeData.findMin().key}!`)
          }>
          FindMin
        </Button>{' '}
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="rise"
          onClick={e =>
            message.success(`Maximum is ${treeData.findMax().key}!`)
          }>
          FindMax
        </Button>
        <Button
          style={{marginRight: '1em'}}
          shape="round"
          type="primary"
          icon="right"
          onClick={e => {
            const succ = treeData.succ(key);
            if (succ === null) {
              message.error(`There is no successor of ${key}`);
            } else {
              message.success(`Successor of ${key} is ${succ.key}!`);
            }
          }}>
          Successor
        </Button>
        <Button
          onClick={e => {
            const pred = treeData.pred(key);
            if (pred === null) {
              message.error(`There is no predeccesor of ${key}`);
            } else {
              message.success(`Predecessor of ${key} is ${pred.key}!`);
            }
          }}
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
