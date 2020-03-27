import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const Legend = props => {
  const [visible, setVisible] = useState(false);
  return (
    <span style={{textAlign: 'center'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Legend
      </Button>
      <Modal
        title="Legend"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Source Node: <font color="black">Black</font>
        </p>
        <p>
          Destination Node: <font color="red">RED</font>
        </p>
        <p>
          Node that was extracted from PQ: <font color="green">GREEN</font>
        </p>
        <p>
          Neighbor node: <font color="darkgoldenrod">YELLOW</font>
        </p>
      </Modal>
    </span>
  );
};

export default Legend;
