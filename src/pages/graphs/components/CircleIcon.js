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
      style={
        props.selected
          ? {fontSize: '110px', border: '5px solid yellowgreen', borderRadius: '50%'}
          : {fontSize: '100px'}
      }
    />
  );
}

export default CircleIcon;
