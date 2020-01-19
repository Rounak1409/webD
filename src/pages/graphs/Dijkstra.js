import React, {useState} from 'react';
import GraphNode from '../../components/GraphNode';
import {Button} from 'antd';

function Dijkstra(props) {
  const [isClick, setIsClick] = useState(false);
  const [xCoor, setXCoor] = useState(null);
  const [yCoor, setYCoor] = useState(null);

  const onClickSet = e => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    setXCoor(x);
    setYCoor(y);
    setIsClick(true);
  };

  const onClickReset = e => {
    setIsClick(false);
    setXCoor(null);
    setYCoor(null);
  };

  return (
    <div
      onClick={onClickSet}
      style={{
        borderColor: 'red',
        borderStyle: 'solid',
        height: '500px',
        width: '100%',
        textAlign: 'center',
      }}>
      <Button type="primary" onClick={onClickReset}>
        Reset
      </Button>
      {isClick ? <GraphNode x={xCoor} y={yCoor} /> : <div />}
    </div>
  );
}

export default Dijkstra;
