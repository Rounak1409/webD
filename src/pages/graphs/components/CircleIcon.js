import React from 'react';
import {Icon} from 'antd';
import {ReactComponent as Circle} from './circle.svg';

function CircleIcon(props) {
  /*
    borderStyle: 'solid',
    borderRadius: '50%',
    borderColor: 'yellow',
    */
  const normalStyle = {
    fontSize: '100px',
  };

  const selectedStyle = {
    fontSize: '110px',
    border: '5px solid yellowgreen',
    borderRadius: '50%',
  };

  const startingNodeStyle = {
    fontSize: '110px',
    border: '5px solid black',
    borderRadius: '50%',
  };

  const endingNodeStyle = {
    fontSize: '110px',
    border: '5px solid red',
    borderRadius: '50%',
  };

  const neighborNodeStyle = {
    fontSize: '110px',
    border: '5px solid yellow',
    borderRadius: '50%',
  };

  const determineStyle = () => {
    if (props.selected) {
      return selectedStyle;
    } else if (props.isNeighbor) {
      return neighborNodeStyle;
    } else if (props.isStart) {
      return startingNodeStyle;
    } else if (props.isEnd) {
      return endingNodeStyle;
    } else {
      return normalStyle;
    }
  };
  return <Icon component={Circle} style={determineStyle()} />;
}

export default CircleIcon;
