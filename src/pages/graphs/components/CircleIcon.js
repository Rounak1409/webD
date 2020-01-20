import React from 'react';
import {Icon} from 'antd';
import {ReactComponent as Circle} from './circle.svg';

function CircleIcon(props) {
  /*
    borderStyle: 'solid',
    borderRadius: '50%',
    borderColor: 'yellow',
    */
  return (
    <Icon
      component={Circle}
      style={{fontSize: '100px'}}
    />
  );
}

export default CircleIcon;
