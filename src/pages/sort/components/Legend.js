import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const Legend = props => {
  const [visible, setVisible] = useState(false);
  return (
    <span style={{textAlign: 'center', margin: '0 1em'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Legend
      </Button>
      <Modal
        title="Legend"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Bars that are sorted: <font color="green">GREEN</font>
        </p>
        <p>
          Bars that are not sorted: <font color="blue">BLUE</font>
        </p>
        <p>
          Bars at low and high position of the interval (during merge sort):{' '}
          <font color="orange">ORANGE</font>
        </p>
      </Modal>
    </span>
  );
};

export default Legend;
