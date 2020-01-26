import React from 'react';
import {Row, Col, Carousel} from 'antd';
import MenuBar from './graphs/components/MenuBar';
import './HomePage.css';

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
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '40em',
          justifyContent: 'space-evenly',
        }}>
        <Row type="flex" align="middle" style={{textAlign: 'center'}}>
          <Col span={12}>
            <Carousel autoplay style={{margin: '0 2.5em'}}>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </Carousel>
          </Col>
          <Col span={12} style={{alignSelf: 'flex-start'}}>
            <h1>Welcome to Ray's CS2040S Visualizer!</h1>
            <h2>
              This is where I showcase the different algorithms taught in
              CS2040S.
            </h2>
            <h2>
              This project is still under development. Stay tuned for updates!
            </h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
