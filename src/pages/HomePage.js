import React from 'react';
import {Row, Col} from 'antd';
import MenuBar from './graphs/components/MenuBar';

function HomePage(props) {
  const data = [
    {
      value: 'graphs',
      onClick: e => props.history.push('/graphs'),
      type: 'radar-chart',
      text: 'Graph Algorithms',
    },
  ];

  return (
    <div>
      <MenuBar data={data} />
      <div
        style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <h1>Welcome to Ray's CS2040S Visualizer!</h1>
        <h2>
          This is where I showcase the different algorithms taught in CS2040S.
        </h2>
        <h2>
          This project is still under development. Stay tuned for updates!
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
