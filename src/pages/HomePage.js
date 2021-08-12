import React from 'react';
import {Link} from 'react-router-dom';
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
    {
      value: 'searching',
      onClick: e => props.history.push('/search'),
      type: 'file-search',
      text: 'Searching Algorithms',
    },
    {
      value: 'sorting',
      onClick: e => props.history.push('/sort'),
      type: 'sort-ascending',
      text: 'Sorting Algorithms',
    },
    {
      value: 'dataStructures',
      onClick: e => props.history.push('/ds'),
      type: 'database',
      text: 'Data Structures',
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
              <Link to="/graphs">
                <div className="display graph">
                  <h1
                    style={{
                      fontSize: '3em',
                      opacity: '1.0',
                      fontWeight: 'bold',
                    }}>
                    Graph Algorithms Visualizer
                  </h1>
                </div>
              </Link>
              <Link to="/search">
                <div className="display search">
                  <h1
                    style={{
                      background: 'rgba(115, 111, 104, 0.1)',
                      fontSize: '3em',
                      opacity: '1.0',
                      fontWeight: 'bold',
                    }}>
                    Search Algorithms Visualizer
                  </h1>
                </div>
              </Link>
              <Link to="/sort">
                <div className="display sort">
                  <h1
                    style={{
                      background: 'rgba(115, 111, 104, 0.1)',
                      fontSize: '3em',
                      opacity: '1.0',
                      fontWeight: 'bold',
                    }}>
                    Sort Algorithms Visualizer
                  </h1>
                </div>
              </Link>
              <Link to="/ds">
                <div className="display dataStructures">
                  <h1
                    style={{
                      background: 'rgba(115, 111, 104, 0.1)',
                      fontSize: '3em',
                      opacity: '1.0',
                      fontWeight: 'bold',
                    }}>
                    Data Structures Visualizer
                  </h1>
                </div>
              </Link>
            </Carousel>
          </Col>
          <Col span={12} style={{alignSelf: 'flex-start'}}>
            <h1>Welcome to Algorithms Visualizer!</h1>
            <h2>
              This is where I showcase the different algorithms taught in
              DSA.
            </h2>
            <h2>
              Implemented Algorithms & Data-Structures:
              <li>Dijkstra</li>
              <li>Bellman-Ford</li>
              <li>Binary Search</li>
              <li>Insertion Sort</li>
              <li>Bubble Sort</li>
              <li>Selection Sort</li>
              <li>Merge Sort</li>
              <li>Binary Search Tree</li>
              <li>AVL Tree</li>
            </h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
